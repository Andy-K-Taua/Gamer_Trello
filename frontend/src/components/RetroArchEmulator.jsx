// frontend/src/components/RetroArchEmulator.jsx

import React, { useEffect, forwardRef, memo } from 'react';

const RetroArchEmulator = forwardRef((props, ref) => {
  const { game } = props;

  console.log('RetroArchEmulator component rendered');
  useEffect(() => {
    console.log('useEffect hook executed');

    const loadScript = () => {
      if (!document.querySelector('script[src="/EmulatorJS-4.2.1/data/loader.js"]')) {
        const script = document.createElement('script');
        script.src = '/EmulatorJS-4.2.1/data/loader.js';
        script.onload = () => {
          // Script loaded, now you can use EJS_Runtime
          window.EJS_player = '#game';
          window.EJS_core = 'genesis_plus_gx';
          window.EJS_gameUrl = `/games/${game}.md`;
          window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
        };
        document.body.appendChild(script);
      } else {
        // Script already loaded, you can use EJS_Runtime
        window.EJS_player = '#game';
        window.EJS_core = 'genesis_plus_gx';
        window.EJS_gameUrl = `/games/${game}.md`;
        window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
        
      }
    };

    loadScript();

    return () => {
      console.log('Cleanup function called');
    };
  }, [game]);

  return (
    <div id='game' ref={ref} style={{ width: '100%', height: '100%', maxWidth: '100%' }} />
  );
});

export default memo(RetroArchEmulator);