import connectDB from "../src/config/db";
import app from "../src/app";
import dotenv from "dotenv";

dotenv.config();

connectDB();

export default app;
