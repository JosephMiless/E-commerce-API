import { submitReviews, viewReviews } from "./reviews.services.js";
import {reviewsSchema} from "../validators/reviews.js"
import { findProducts } from "../products/products.services.js";
import { getOrderItems } from "../orders/orders.services.js";

export const submitReviewsController = async(req, res) => {
    try {

        const curr_user = req.user;

        if(!curr_user) {
            return res.status(401).json({
                error: "Kndly login to submit a review"
            })
        };

        const {error, value} = reviewsSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                error: error.message
            })
        };
 
        const {product, rating, comment} = value;

        const productAvailable = await findProducts(product);

        if( productAvailable.length == 0) {
            return res.status(404).json({
                message: "Product not found"
            })
        };
 
        const orderedProducts = await getOrderItems(curr_user.email); 
                   
         const checkOrders = (productName, checkOrderitem) =>{ 
 
            for (let item in checkOrderitem){ 
 
                if (productName == checkOrderitem[item].product){ 
 
                    return true 
 
                }
 
            } 
 
            return false 
 
        };

        const productOrdered = checkOrders(product, orderedProducts);
        
        if (!productOrdered){

            return res.status(404).json({
                error: "Unable to post review; product hasn't been ordered by you"
            })
            
        };

        await submitReviews(curr_user.email, product, rating, comment);

        return res.status(201).json({
            message: "Review submited successfully"
        })
        
    } catch (error) {

        console.log("Error submitting reviews", error);

        return res.status(400).json({
            error: "Error submitting reviews"
        })

    }
};

export const viewReviewsController = async(req, res) => {
    try {

        const curr_user = req.user;

        const product = req.params.id;

        const productAvailable = await findProducts(product);

        if( productAvailable.length == 0) {
            return res.status(404).json({
                message: "Product not found"
            })
        };

        if(!curr_user) {
            return res.status(401).json({
                error: "Unathorized. Kindly login"
            })
        };

        const reviews = await viewReviews(product);

        if(reviews.length == 0) {
            return res.status(404).json({
                message: "There are currently no reviews on this product"
            })
        };

        return res.status(200).json({reviews});
        
    } catch (error) {

        console.log("Error getting reviews", error);

        return res.status(400).json({
            error: "Error getting reviews"
        })
        
    }
};