import { Router } from "express";
import { initializePayment, verifyPayment } from "./payment.controller.js";
import { auth } from "../middleware/auth.js";

export const paymentRouter = Router();

paymentRouter.post("/initialize", auth, initializePayment);
paymentRouter.get("/verify", auth, verifyPayment);