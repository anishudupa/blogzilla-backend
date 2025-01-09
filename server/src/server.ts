import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
app.listen(PORT ?? 5000, () => console.log("SERVER IS RUNNING ON PORT", PORT));

export default app;
