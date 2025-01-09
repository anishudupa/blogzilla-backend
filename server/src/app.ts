import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import userRouter from "./routes/user.route";
import blogRouter from "./routes/blog.route";
import ApiError from "./utils/ApiError";
import ApiResponse from "./utils/ApiResponse";
import { JsonWebTokenError } from "jsonwebtoken";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/api/v1", (_: Request, res: Response) => {
	res.json({ message: "api is running fine" });
	return;
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
	if (err instanceof ApiError) {
		res.status(400).json({
			...new ApiResponse("ERROR", null, err.statusCode, err.apiMessage),
			err,
		});
	} else if (err instanceof JsonWebTokenError) {
		res.status(400).json({
			...new ApiResponse("ERROR", null, 400, err.message),
			err,
		});
	} else {
		res.status(500).json({ message: "SERVER ERROR", err });
	}
});

export default app;
