import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const URI =
			process.env.NODE_ENV === "DEVELOPMENT"
				? process.env.MONGO_DEV_URI
				: process.env.MONGO_URI;

		mongoose.connection.on("connected", () => console.log("connected"));
		mongoose.connection.on("open", () => console.log("open"));
		mongoose.connection.on("disconnected", () => console.log("disconnected"));
		mongoose.connection.on("reconnected", () => console.log("reconnected"));
		mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
		mongoose.connection.on("close", () => console.log("close"));

		await mongoose.connect(URI as string);
		console.log("DB CONNECTED");
	} catch (error) {
		console.error("Error connecting to DB", error);
		process.exit(1);
	}
};

export default connectDB;
