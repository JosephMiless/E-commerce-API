import { Router } from "express";
import { regsiterUserController, loginUser,
    getProfileController, updateUserProfileController,
    resetPasswordController, generateOtpController, 
    verifyOtpController
} from "./users.controllers.js";
import { auth } from "../middleware/auth.js";

export const userRouter = Router();

userRouter.post("/signup", regsiterUserController);
userRouter.post("/login", loginUser);
userRouter.get("/profile", auth, getProfileController);
userRouter.put("/update", auth,  updateUserProfileController);
userRouter.put("/resetpassword", auth,  resetPasswordController);
userRouter.put("/forgotpassword", generateOtpController);
userRouter.put("/verifyotp", verifyOtpController);
