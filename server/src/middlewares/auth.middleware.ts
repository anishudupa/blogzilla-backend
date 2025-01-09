import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import User from "../models/user.model";
export const authorize = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const token = req.header("Authorization")?.split(" ")[1];
		if (!token) {
			throw new ApiError("Unauthorized. Token must be provided", 403, []);
		}
		const { id } = jwt.verify(token!, process.env.JWT_SECRET!) as {
			id: string;
		};
		if (!id) throw new ApiError("Invalid Token", 403, []);
		const user = await User.findById(id);
		if (!user) {
			throw new ApiError("Invalid token", 403, []);
		}
		req.headers["userId"] = id;
		next();
	} catch (error) {
		next(error);
		return;
	}
};
