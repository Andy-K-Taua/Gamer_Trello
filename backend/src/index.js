// backend/src/index.js

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import { connectDB } from "../lib/db.js"
import authRoutes from "../routes/auth.route.js";
import subscriptionRoutes from "../routes/subscription.route.js";
import gamesRoute from '../routes/games.route.js';
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());


const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", authRoutes)
app.use("/api/subscriptions", subscriptionRoutes);
app.use('/api', gamesRoute);

app.listen(PORT, () => {
    console.log("server is running on port: " + PORT);
    connectDB()
}); 