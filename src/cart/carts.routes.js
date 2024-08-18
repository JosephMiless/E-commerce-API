import { Router } from "express";
import { addToCartController, removeFromCartQuantityController,
     addToCartQuantityController, viewCartController, removeItemFromCartController
    } from "./carts.controller.js";
import {auth} from "../middleware/auth.js";

export const cartsRouter = Router();

cartsRouter.post("/add", auth, addToCartController);
cartsRouter.put("/reducequantity", auth, removeFromCartQuantityController);
cartsRouter.put("/increasequantity", auth, addToCartQuantityController);
cartsRouter.get("/view", auth, viewCartController);
cartsRouter.delete("/remove", auth,removeItemFromCartController);