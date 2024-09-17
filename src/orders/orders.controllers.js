import { placeOrders, totalAmount, getAllOrders } from "./orders.services.js";
import { searchCart, clearCart } from "../cart/carts.services.js";
import { myuuid } from "../utils/uuid.js";

export const placeOrderControler = async(req, res) => {
    try {

        const curr_user = req.user;

        if(!curr_user) {
            return res.status(401).json({
                error: "Unauthorized; kidnly login to place order"
            })
        };

        const userCart = await searchCart(curr_user.email);

        if(userCart.length == 0) {
            return res.status(404).json({
                message: "Add items to cart to place an order"
            })
        }

        const total_amount = await totalAmount(curr_user.email);        

        const order = await placeOrders(myuuid, curr_user.email, JSON.stringify(userCart), total_amount[0].total);

        await clearCart(curr_user.email);

        return res.status(200).json({
            message: "Order placed successfuly"
        })
        
    } catch (error) {

        console.log("Error placing order", error);

        return res.status(400).json({
            error: "Error placing order"
        })

    }
};

export const getAllOrdersController = async(req, res) => {
    try {

        const curr_user = req.user;

        if(!curr_user) {
            return res.status(401).json({
                error: "Unauthorized; kindly login to get orders"
            })
        };

        const orders = await getAllOrders(curr_user.email);

        if(orders.length == 0){
            return res.status(404).json({
                error: "You are yet to place an order"
            })
        };

        return res.status(200).json({
            orders
        })
        
    } catch (error) {

        console.log("Error geting orders", error);

        return res.status(400).json({
            error: "Error getting orders"
        })
    }
};