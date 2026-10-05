import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

import connectDB from "./config/db.js";

const app = express()
app.use(cors())
app.use(express.json())


await connectDB()