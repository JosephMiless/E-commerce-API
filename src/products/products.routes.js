import { Router } from "express";
import { addProductsController, getProductsController, getSingleProductController, 
    deleteProductsController, updateProductsController 
} from "./products.controllers.js";
import { auth, adminAuth } from "../middleware/auth.js";

export const productRouter = Router();

productRouter.post("/add", auth, adminAuth, addProductsController);

productRouter.get("/get", auth, getProductsController);

productRouter.get("/get/:id", auth, getSingleProductController);

productRouter.delete("/delete/:id", auth, adminAuth, deleteProductsController);

productRouter.put("/update/:id", auth, adminAuth, updateProductsController);