import { Router } from "express";
import { post } from "../controllers/userController.js";
import validateSchema from "../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/signup",validateSchema(userSchema), post);

export default userRouter;