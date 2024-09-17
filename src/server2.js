import express from "express";
import { config } from "./config/env.js";
import { userRouter } from './users/users.routes.js';
import { reviewsRouter } from './reviews/reviews.routes.js';
import { tokenRouter } from './tokens/tokens.routes.js';
import { paymentRouter } from './payments/paymnents.routes.js';


const app = express();


app.use(express.json());


app.use("/user", userRouter);
app.use("/reviews", reviewsRouter);
app.use ("/token", tokenRouter);
app.use("/payment", paymentRouter);


app.listen( config.port2, async() => {
    console.log("server2 is running on port", config.port2);
});