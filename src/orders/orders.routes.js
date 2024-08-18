import { Router } from "express";
import {auth} from "../middleware/auth.js";
import { placeOrderControler, getAllOrdersController} from "./orders.controllers.js";

export const ordersRouter = Router();

ordersRouter.post("/place", auth, placeOrderControler);
ordersRouter.get("/all", auth, getAllOrdersController);