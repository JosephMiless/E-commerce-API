import { Router } from "express";
import { submitReviewsController, viewReviewsController } from "./reviews.controller.js";
import { auth } from "../middleware/auth.js";


export const reviewsRouter = Router();

reviewsRouter.post("/submit", auth, submitReviewsController);
reviewsRouter.get("/get/:id", auth, viewReviewsController);