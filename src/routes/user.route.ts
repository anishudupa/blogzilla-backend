import express from "express";
import {
	getUser,
	loginUser,
	registerUser,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, signupSchema } from "../schemas/user.schema";
import { authorize } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/signup", validate(signupSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/get-user", authorize, getUser);

export default router;
