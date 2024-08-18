import { executeQuery } from "../config/database.js";

export const addToCart = async(user, product, quantity, price) => {
    try {

        const query = `
        INSERT INTO cart(user, product, quantity, price)
        VALUES(?, ?, ?, ?)
        `;

        const values = [user, product, quantity, price];

        const results = await executeQuery(query, values);

        return results;
        
    } catch (error) {

        console.log("Error adding product to cart", error);

    }
};

export const searchCart = async(user) => {
    try {

        const query = `
        SELECT product, quantity, price FROM cart WHERE user = ?
        `;

        const values = [user];

        const results = await executeQuery(query, values);

        return results;
        
    } catch (error) {
        console.log("Error searching cart", error);
    }
};

export const getCartProductByUser = async(user) => {
    try {

        const query = `
        SELECT product FROM cart WHERE user = ?
        `;

        const values = [user];

        const results = await executeQuery(query, values);

        return results;
        
    } catch (error) {
        console.log("Error searching cart", error);
    }
};

export const addToCartItemQuantities = async(quantity, price, user, product) => {
    try {

        const query = `
        UPDATE cart
        SET quantity = quantity + ?, price = ?
        WHERE user = ? AND product = ?
        `;

        const values = [quantity, price, user, product];

        const results = await executeQuery(query, values);

        return results;
        
    } catch (error) {
        console.log("Error updating item quantity");
    }
};

export const removeFromCartItemQuantities = async(quantity, price, user, product) => {
    try {

        const query = `
        UPDATE cart
        SET quantity = quantity - ?, price = ?
        WHERE user = ? AND product = ?
        `;

        const values = [quantity, price, user, product];

        const results = await executeQuery(query, values);

        return results;
        
    } catch (error) {
        console.log("Error updating item quantity");
    }
};

export const searchCartByUserAndProduct = async(user, product) => {
    try {

        const query = `
        SELECT * FROM cart WHERE user = ? AND product= ?
        `;

        const values = [user, product];

        const results = await executeQuery(query, values);

        return results;
        
    } catch (error) {
        console.log("Error searching cart", error);
    }
};

export const removeItemFromCart = async(user, product) => {
    try {

        const query = `
        DELETE FROM cart WHERE user = ? AND product = ?
        `;

        const values = [user, product];

        const results = await executeQuery(query, values);

        return results;
        
    } catch (error) {
        console.log("Error removing item from cart");
    }
};

export const clearCart = async(user) => {
    try {

        const query = `
        DELETE FROM cart WHERE user = ?
        `;

        const values = [user];

        const results = await executeQuery(query, values);

        return results;
        
    } catch (error) {
        console.log("Error removing item from cart");
    }
};

