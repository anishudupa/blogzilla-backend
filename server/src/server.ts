import app from "./app";
import connectDB from "./config/db";
import dotenv from "dotenv";

dotenv.config();

(async function () {
	try {
		await connectDB();
		const PORT = process.env.PORT;
		app.listen(PORT ?? 5000, () =>
			console.log("SERVER IS RUNNING ON PORT", PORT)
		);
	} catch (error) {
		console.log(error);
	}
})();
