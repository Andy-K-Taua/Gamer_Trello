// backend/src/index.js

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import { connectDB } from "../lib/db.js"
import authRoutes from "../routes/auth.route.js";
import subscriptionRoutes from "../routes/subscription.route.js";
import gamesRoute from '../routes/games.route.js';
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendBuildPath = path.join(__dirname, '../../../frontend/dist');      

app.use(express.json());


const PORT = process.env.PORT || 10000; // Default port for Render
const HOST = '0.0.0.0'; // Bind to 0.0.0.0 for Rende

app.use(express.static(frontendBuildPath));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://gamer-trello.onrender.com",
    credentials: true,
}));

app.use(express.static(frontendBuildPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });

app.use("/api/auth", authRoutes)
app.use("/api/subscriptions", subscriptionRoutes);
app.use('/api', gamesRoute);

app.listen(PORT, HOST, () => {
    console.log(`server is running on port ${HOST}:${PORT}`);
    connectDB()
}); 