import express, { NextFunction } from "express";
import { validate } from "../middlewares/validate.middleware";
import { authorize } from "../middlewares/auth.middleware";
import {
	createBlogSchema,
	deleteSingleBlogSchema,
	getBlogsByCategorySchema,
	getRandomBlogsScehma,
	getSingleBlogSchema,
	updateBlogSchema,
} from "../schemas/blog.schema";
import {
	createBlog,
	deleteBlog,
	getBlogsByCategory,
	getBlogsOfUser,
	getRandomBlogs,
	getSingleBlog,
	updateBlog,
} from "../controllers/blog.controller";

const router = express.Router();

router.post("/", authorize, validate(createBlogSchema), createBlog);
router.put("/:blogId", authorize, validate(updateBlogSchema), updateBlog);
router.delete(
	"/:blogId",
	authorize,
	validate(deleteSingleBlogSchema),
	deleteBlog
);
router.get("/", authorize, getBlogsOfUser);
router.get(
	"/random",
	authorize,
	validate(getRandomBlogsScehma),
	getRandomBlogs
);
router.get("/:blogId", authorize, validate(getSingleBlogSchema), getSingleBlog);
router.get(
	"/category/:category",
	authorize,
	validate(getBlogsByCategorySchema),
	getBlogsByCategory
);

export default router;
