import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IUser extends Document {
	username: string;
	email: string;
	password: string;
	about?: string;
	comparePassword(password: string): Promise<boolean>;
	generateToken(): string;
}

const userSchema = new mongoose.Schema<IUser>({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	about: { type: String, default: "" },
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.comparePassword = async function (password: string) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
	return jwt.sign({ id: this._id.toString() }, process.env.JWT_SECRET!, {
		expiresIn: "2 days",
	});
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
