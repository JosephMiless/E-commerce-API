import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { refreshTokenController } from "./tokens.controller.js";
import { logoutController } from "./tokens.controller.js";

export const tokenRouter = Router();

tokenRouter.post("/refresh" , refreshTokenController);
tokenRouter.delete("/logout", auth, logoutController);