// backend/src/index.js

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import { connectDB } from "../lib/db.js"
import authRoutes from "../routes/auth.route.js";
import subscriptionRoutes from "../routes/subscription.route.js";
import gamesRoute from '../routes/games.route.js';
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'node:path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const frontendBuildPath = path.resolve(__dirname, '../../frontend/dist');

app.use(express.json());
app.use(express.static(frontendBuildPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });

const PORT = process.env.PORT || 10000; // Default port for Render
const HOST = '0.0.0.0'; // Bind to 0.0.0.0 for Render


app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true,
}));


app.use("/api/auth", authRoutes)
app.use("/api/subscriptions", subscriptionRoutes);
app.use('/api', gamesRoute);

app.listen(PORT, HOST, () => {
    console.log(`server is running on port ${HOST}:${PORT}`);
    connectDB()
}); 