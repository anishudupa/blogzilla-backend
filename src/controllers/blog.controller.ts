import { Request, Response, NextFunction } from "express";
import Blog from "../models/blog.model";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";

export const createBlog = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { title, content, excerpt, slug, category } = req.body;
		const newBlog = new Blog({
			title,
			author: req.headers["userId"],
			content,
			excerpt,
			slug,
			category,
		});
		await newBlog.save();
		res
			.status(201)
			.json(
				new ApiResponse("SUCCESS", newBlog, 201, "Blog created successfully")
			);
		return;
	} catch (error) {
		next(error);
		return;
	}
};

export const updateBlog = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { title, content, excerpt, slug, category } = req.body;
		const { blogId } = req.params;
		const updatedBlog = await Blog.findOneAndUpdate(
			{ $and: [{ author: req.headers["userId"] }, { _id: blogId }] },
			{
				title,
				content,
				excerpt,
				slug,
				category,
			},
			{ new: true }
		);
		if (!updatedBlog) throw new ApiError("Blog not found", 404, []);
		res
			.status(201)
			.json(
				new ApiResponse(
					"SUCCESS",
					updatedBlog,
					204,
					"Blog updated successfully"
				)
			);
		return;
	} catch (error) {
		next(error);
		return;
	}
};

export const deleteBlog = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { blogId } = req.params;
		const deletedBlog = await Blog.findOneAndDelete({
			$and: [{ author: req.headers["userId"] }, { _id: blogId }],
		});
		if (!deletedBlog) throw new ApiError("Cannot find Blog", 404, []);
		res.json(
			new ApiResponse("SUCCESS", deletedBlog, 204, "Blog deleted successfully")
		);
		return;
	} catch (error) {
		next(error);
	}
};

export const getBlogsOfUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const blogs = await Blog.find({ author: req.headers["userId"] });
		if (!blogs) throw new ApiError("author not found", 400, []);
		res.json(new ApiResponse("SUCCESS", blogs, 200, "got all blogs by userId"));
	} catch (error) {
		next(error);
	}
};

export const getRandomBlogs = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { offset, perPage } = req.query;
		const blogs = await Blog.find({})
			.skip(Number(offset))
			.limit(Number(perPage))
			.populate("author")
			.select("-password");
		res.json(
			new ApiResponse("SUCCESS", blogs, 200, "got random blogs successfully")
		);
		return;
	} catch (error) {
		next(error);
	}
};

export const getSingleBlog = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { blogId } = req.params;
		const blog = await Blog.findById(blogId);
		if (!blog) throw new ApiError("Cannot find the blog", 404, []);
		res.json(new ApiResponse("SUCCESS", blog, 200, "Blog found successfully"));
		return;
	} catch (error) {
		next(error);
	}
};

export const getBlogsByCategory = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { category } = req.params;
		const blogsByCategory = await Blog.find({ category });
		res.json(
			new ApiResponse(
				"SUCCESS",
				blogsByCategory,
				200,
				"Found blogs by category"
			)
		);
	} catch (error) {
		next(error);
	}
};
