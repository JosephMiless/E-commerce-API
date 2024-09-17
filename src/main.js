import express from 'express';
import { config } from './config/env.js';
import { tables } from './utils/tables.functions.js';
import { productRouter } from './products/products.routes.js';
import { cartsRouter } from './cart/carts.routes.js';
import { ordersRouter } from './orders/orders.routes.js';
import { imageRouter } from './utils/image.js';


const app = express();


app.use(express.json());


app.use("/products", productRouter);
app.use("/carts", cartsRouter);
app.use("/orders", ordersRouter);
app.use("/image", imageRouter);


app.listen(config.port, async() => {
    await tables();
    console.log("server1 is running on port", config.port);
});