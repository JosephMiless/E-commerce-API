import express from 'express';
import { config } from './config/env.js';
import { tables } from './utils/tables.functions.js';
import { userRouter } from './users/users.routes.js';
import { productRouter } from './products/products.routes.js';
import { cartsRouter } from './cart/carts.routes.js';
import { ordersRouter } from './orders/orders.routes.js';
import { imageRouter } from './utils/image.js';
import { reviewsRouter } from './reviews/reviews.routes.js';
import { tokenRouter } from './tokens/tokens.routes.js';
import { paymentRouter } from './payments/paymnents.routes.js';


const app = express();


app.use(express.json());


app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/carts", cartsRouter);
app.use("/orders", ordersRouter);
app.use("/image", imageRouter);
app.use("/reviews", reviewsRouter);
app.use ("/token", tokenRouter);
app.use("/payment", paymentRouter);

app.listen(config.port, async() => {
    await tables();
    console.log("server's running on port", config.port);
});