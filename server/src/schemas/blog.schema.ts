import { z } from "zod";

export const createBlogSchema = z.object({
	body: z.object({
		title: z.string().min(3, "Title must be porvided"),
		content: z.string().min(3, "Content must be provided"),
		excerpt: z.string().optional(),
		slug: z
			.string()
			.regex(new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$"), "Invalid slug"),
		category: z
			.enum(["Food", "Tech", "Politics", "Culture", "Programming", "Film"])
			.optional(),
	}),
});

export const updateBlogSchema = z.object({
	body: z.object({
		title: z.string().min(3, "Title must be porvided"),
		content: z.string().min(3, "Content must be provided"),
		excerpt: z.string().optional(),
		slug: z
			.string()
			.regex(new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$"), "Invalid slug"),
		category: z
			.enum(["Food", "Tech", "Politics", "Culture", "Programming", "Film"])
			.optional(),
	}),
	params: z.object({
		blogId: z.string().min(1, "Blog id must be provided"),
	}),
});

export const getSingleBlogSchema = z.object({
	params: z.object({
		blogId: z.string().min(1, "Blog id is required"),
	}),
});

export const deleteSingleBlogSchema = z.object({
	params: z.object({
		blogId: z.string().min(1, "Blog id is required"),
	}),
});

export const getRandomBlogsScehma = z.object({
	query: z.object({
		offset: z
			.string()
			.min(1, "offset must be provided")
			.refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
				message: "offset must be >= 0",
			}),
		perPage: z
			.string()
			.min(1, "perPage must be provided")
			.refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
				message: "PerPage must be >= 0",
			}),
	}),
});

export const getBlogsByCategorySchema = z.object({
	params: z.object({
		category: z.string().min(1, "Category must be provided"),
	}),
});
