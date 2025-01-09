import mongoose from "mongoose";

type TBlog = {
	title: string;
	content: string;
	excerpt: string;
	slug: string;
	category?: string;
	author: unknown;
};

const blogSchema = new mongoose.Schema<TBlog>({
	title: { type: String, required: true },
	content: { type: String, required: true },
	excerpt: { type: String, default: "" },
	slug: { type: String, required: true },
	category: {
		type: String,
		enum: ["Food", "Tech", "Politics", "Culture", "Programming", "Film"],
	},
	author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const Blog = mongoose.model<TBlog>("Blog", blogSchema);
export default Blog;
