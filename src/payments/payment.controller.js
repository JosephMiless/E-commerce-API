import { config } from "../config/env.js";
import paystack from "paystack";
import { updateOrderStatus, getPendingOrders, 
  getOrderItems, getAwaitingOrders, getOrderItemsByUserAndOrderID 
} from "../orders/orders.services.js";
import { verifyPaymentSchema } from "../validators/payment.js";
import { updateProductsStock } from "../products/products.services.js";

const Paystack = paystack(config.pay_secret)


export const initializePayment = async (req, res) => {
    try {

    const curr_user = req.user;

    if(!curr_user) {
        return res.status(401).json({
            error: "Unauthorized"
        })
    };

    const orderDetails = await getPendingOrders(curr_user.email);

    if(orderDetails.length == 0) {
            return res.status(404).json({
                message: "There are currently no outstanding orders"
            })
        };

    const amount = orderDetails[0].total_amount;

    const params = {
      email: curr_user.email,
      amount: amount * 100,
    };
    
      const response = await Paystack.transaction.initialize(params);

      const status = "awaiting";

      await updateOrderStatus(status, orderDetails[0].orderID);
      res.status(200).json({
        message: 'Transaction initialized successfully',
        data: response,
      });
    } catch (error) {

        console.log("Transaction initialization failed", error);
        
       return res.status(500).json({
        message: 'Transaction initialization failed',
        error: error.message,
      });
    }
  };

export const verifyPayment = async (req, res) => {
    try {

        const curr_user = req.user;

        if(!curr_user) {
            return res.status(401).json({
                error: "Unauthorized"
            })
        };

        const {error, value} = verifyPaymentSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                error: error.message
            })
        };

        const {reference} = value;

        const awaitingOrderDetails = await getAwaitingOrders(curr_user.email);        
        
        if(awaitingOrderDetails.length == 0) {
            return res.status(404).json({
                message: "There are currently no outstanding orders"
            })
        };

      const response = await Paystack.transaction.verify(reference);      

      if (response.data.status === 'success') {
        const itemsOrdered = await getOrderItemsByUserAndOrderID(awaitingOrderDetails[0].user, awaitingOrderDetails[0].orderID);

        try {

          itemsOrdered.forEach(item => {
            updateProductsStock(item.quantity, item.product);
          });
          
        } catch (error) {
          console.log("Error updating stock", error);
          
        }

        const status = "completed";

        await updateOrderStatus(status, awaitingOrderDetails[0].orderID);
        
        res.status(200).json({
          message: 'Payment verified successfully',
          data: response.data,
        });
      } else {
                
        // Handle unsuccessful payment here
        res.status(400).json({
          message: 'Payment verification failed',
          data: response.data,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Payment verification failed',
        error: error.message
      });
    }
  };