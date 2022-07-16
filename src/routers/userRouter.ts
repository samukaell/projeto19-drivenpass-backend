import { Router } from "express";
import { singUp,singIn,teste } from "../controllers/userController.js";
import validateSchema from "../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/signup",validateSchema(userSchema), singUp);
userRouter.post("/signin",validateSchema(userSchema), singIn);
userRouter.post("/teste", teste);

export default userRouter;