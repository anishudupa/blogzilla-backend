import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";

export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { username, email, password, about } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			throw new ApiError("User alread exists", 400, []);
		}
		const newUser = new User({
			username,
			about,
			email,
			password,
		});
		await newUser.save();

		res
			.status(201)
			.json(new ApiResponse(undefined, null, 201, "User created successfully"));
		return;
	} catch (error) {
		next(error);
		return;
	}
};

export const loginUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			throw new ApiError("User not found", 404, []);
		}
		const isTruePass = await user.comparePassword(password);
		if (!isTruePass) {
			throw new ApiError("Incorrect password", 401, []);
		}

		const token = user.generateToken();

		res.json(
			new ApiResponse(undefined, token, 200, "User logged in successfully")
		);
		return;
	} catch (error) {
		next(error);
		return;
	}
};

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const user = await User.findById(req.headers["userId"]).select("-password");
		if (!user) {
			throw new ApiError("user not found", 404, []);
		}
		res.json(new ApiResponse(undefined, user, 200, "User found successfully"));
	} catch (error) {
		next(error);
		return;
	}
};
