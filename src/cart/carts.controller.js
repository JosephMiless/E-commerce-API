import { addToCart, searchCart, searchCartByUserAndProduct, 
    addToCartItemQuantities, removeFromCartItemQuantities,
    removeItemFromCart, getCartProductByUser
 } from "./carts.services.js";
import { addToCartSchema, removeFromCart } from "../validators/cart.js";
import { updateProductsStock, findProducts } from "../products/products.services.js";

export const addToCartController = async(req, res) => {
    try {

        const curr_user = req.user;

        const user = curr_user.email;

        if(!curr_user) {
            return res.status(401).json({
                error: "Unauthorized. Kindly login to add products to cart"
            })
        };

       const {error, value} = addToCartSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                error: error.message
            })
        };

        const {product, quantity} = value;

        const prodcutDetails = await findProducts(product);

        if (prodcutDetails.length == 0) {
            return res.status(404).json({
                error: "Product not found"
            })
        };

        if (prodcutDetails[0].stock == 0) {
            return res.status(400).json({
                error: "Product is currently out of stock. Kindly check back later."
            })
        };

        if (prodcutDetails[0].stock < quantity) {

            return res.status(400).json({
                error: "Quantity exeeds available stock. Kindly reduce quantity, or check back later."
            })

        };

        const cartItems = await searchCartByUserAndProduct(user, product);

        if (cartItems.length == 0 && quantity < 2) {

            const quantity = 1;

            const price = prodcutDetails[0].price * quantity;

            await addToCart(user, product, quantity, price);

            return res.json({
                message: "Product successsfuly added to cart"
            })

        };

        if (cartItems.length == 1 && quantity < 2) {

            const quantity = 1;

            const price = prodcutDetails[0].price * (cartItems[0].quantity + 1);

            await addToCartItemQuantities(quantity, price, cartItems[0].user, cartItems[0].product);

            return res.json({
                message: "Product successsfulyy added to cart"
            })

        };

        if (cartItems.length == 1 && quantity > 1) {

            const price = prodcutDetails[0].price * (cartItems[0].quantity + quantity);
            
            await addToCartItemQuantities(quantity, price, cartItems[0].user, cartItems[0].product);

            return res.json({
                message: "Product successsfulyyy added to cart"
            })

        };

        const price = prodcutDetails[0].price * quantity;

        await addToCart(user, product, quantity, price);

        return res.status(201).json({
            message: "Product added to cart successfully"
        })
        
    } catch (error) {
        console.log("Error adding product to cart", error);
        return res.status(400).json({
            error: "Error adding product to cart"
        })
    }
};

export const removeFromCartQuantityController = async(req, res) => {
    try {

        const curr_user = req.user;

        const user = curr_user.email

        if(!curr_user) {
            return res.status(401).json({
                error: "Unauthorized. Kindly login to add products to cart"
            })
        };

       const {error, value} = addToCartSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                error: error.message
            })
        };

        const {product, quantity} = value;

        const prodcutDetails = await findProducts(product);

        const cartItems = await searchCartByUserAndProduct(user, product);

        if (cartItems.length == 0) {
            return res.status(404).json({
                error: "Add product to cart to increase, or reduce quantity"
            })
        };

        if((cartItems[0].quantity - quantity) < 1 || (cartItems[0].quantity - 1) < 1) {

            await removeItemFromCart(user, product);

            return res.status(201).json({
                message: "Product removed from cart successfuly"
            })

        };

        if (cartItems.length == 1 && quantity <= 0) {

            const quantity = 1;

            const price = prodcutDetails[0].price * (cartItems[0].quantity - quantity);

            await removeFromCartItemQuantities(quantity, price, cartItems[0].user, cartItems[0].product);

            return res.json({
                message: "Quantity updated successfuly"
            }) 

        };

        if (cartItems.length == 1 && quantity > 0) {

            const price = prodcutDetails[0].price * (cartItems[0].quantity - quantity);

            await removeFromCartItemQuantities(quantity, price, cartItems[0].user, cartItems[0].product);

            return res.json({
                message: "Quantity updated successfuly"
            })

        };
        
    } catch (error) {
        console.log("Error updating cart item quanity", error);
        return res.status(400).json({
            error: "Error updating cart item quanity"
        })
    }
};

export const addToCartQuantityController = async(req, res) => {
    try {

        const curr_user = req.user;

        const user = curr_user.email

        if(!curr_user) {
            return res.status(401).json({
                error: "Unauthorized. Kindly login to add products to cart"
            })
        };

       const {error, value} = addToCartSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                error: error.message
            })
        };

        const {product, quantity} = value;

        const prodcutDetails = await findProducts(product);

        const cartItems = await searchCartByUserAndProduct(user, product);

        if (cartItems.length == 0) {

            const price = prodcutDetails[0].price * quantity;

            await addToCart(user, product, quantity, price);

            return res.status(201).json({
                message: "Product added to cart successfuly"
            })
        };

        if ((quantity + cartItems[0].quantity) > prodcutDetails[0].stock) {
            return res.status(400).json({
                error: "Quantity exeeds available stock. Kindly reduce quatity, or check back later"
            })
        };

        if (cartItems.length == 1 && quantity <= 0) {

            const quantity = 1;

            const price = prodcutDetails[0].price * (quantity + cartItems[0].quantity);

            await addToCartItemQuantities(quantity, price, cartItems[0].user, cartItems[0].product);

            return res.json({
                message: "Quantity updated successfuly"
            }) 

        };

        if (cartItems.length == 1 && quantity > 0) {

            const price = prodcutDetails[0].price * (quantity + cartItems[0].quantity);

            await addToCartItemQuantities(quantity, price, cartItems[0].user, cartItems[0].product)

            return res.json({
                message: "Quantity updated successfuly"
            })

        };
        
    } catch (error) {
        console.log("Error updating cart item quanity", error);
        return res.status(400).json({
            error: "Error updating cart item quanity"
        })
    }
};

export const viewCartController = async (req, res) => {
    try {

        const curr_user = req.user;

        if(!curr_user) {
            return res.status(401).json({
                error: "Unauthorized. Kindly login to view cart"
            })
        };

        const userCart = await searchCart(curr_user.email);

        if(userCart.length == 0) {
            return res.status(404).json({
                message: "Your cart is empty. Browse our products to discover amazing deals"
            })
        };

        return res.status(200).json({
            userCart
        });
        
    } catch (error) {

        console.log("Error viewing cart", error);

        return res.status(400).json({
            error: "Error viewing cart"
        })

    }
};

export const removeItemFromCartController = async (req, res) => {
    try {

        const curr_user = req.user;

        if(!curr_user) {
            return res.status(401).json({
                error: "Unauthorized. Kindly login to remove an item from your cart"
            })
        };

        const {error, value} = removeFromCart.validate(req.body);

        if(error) {
            return res.status(400).json({
                error: error.message
            })
        };

        const {productName} = value;

        const userCartProducts = await getCartProductByUser(curr_user.email);

         const checkCart = (products, checkCartProducts) =>{

            for (let item in checkCartProducts){

                if (products == checkCartProducts[item].product){

                    return true

                }

            }

            return false

        };

        const itemInCart = checkCart(productName, userCartProducts);
        
        if (!itemInCart){

            return res.status(404).json({
                error: "Item not found in cart"
            })
            
        };

        await removeItemFromCart(curr_user.email, productName);

        return res.status(200).json({
            message: "Item successfuly removed from cart"
        })

        
    } catch (error) {

        console.log("Error removing item from cart", error);
        
        return res.status(400).json({
            error: "Error removing item from cart"
        })

    }
};