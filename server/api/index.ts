import connectDB from "../src/config/db";
import app from "../src/server";
import dotenv from "dotenv";

dotenv.config();

connectDB();

export default app;
