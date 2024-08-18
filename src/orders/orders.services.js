import { executeQuery } from "../config/database.js";

export const placeOrders = async(orderID, user, items, total_amount) => {
    try {

        const query = `
        INSERT INTO orders(orderID, user, items, total_Amount)
        VALUES(?,?,?,?);
        `;

        const values = [orderID, user, items, total_amount];

        await executeQuery(query, values);
        
    } catch (error) {
        console.log("Error inserting into order table", error);
    }
};

export const totalAmount = async(user) => {
    try {

        const query = `
        SELECT SUM(price) AS total
        FROM cart
        WHERE user = ?;
        `;

        const values = [user];

        const results = await executeQuery(query, values);

        return results;
        
    } catch (error) {
        console.log("Error calculating total amount", error);
    }
};

export const getAllOrders = async(user) => {
    try {

        const query = `
        SELECT * FROM orders WHERE user = ?
        `;

        const values = [user];

        const results = await executeQuery(query, values);

        return results;
        
    } catch (error) {
        console.log("Error fetching from orders table", error);
    }
};

export const updateOrderStatus = async(status, orderID) => {
    try {

        const query = `
        UPDATE orders
        SET status = ?
        WHERE orderID = ?
        `;

        const value = [status, orderID];

        const result = await executeQuery(query, value);

        return result;
        
    } catch (error) {
        console.log("Error updating order table", error);
    }
};

export const getPendingOrders = async(user) => {
    try {

        const query = `
        SELECT * FROM orders WHERE user = ? AND status = "pending"
        `;

        const values = [user];

        const results = await executeQuery(query, values);

        return results;
        
    } catch (error) {
        console.log("Error fetching from orders table", error);
    }
};

export const getAwaitingOrders = async(user) => {
    try {

        const query = `
        SELECT * FROM orders WHERE user = ? AND status = "awaiting"
        `;

        const values = [user];

        const results = await executeQuery(query, values);

        return results;
        
    } catch (error) {
        console.log("Error fetching from orders table", error);
    }
};

export const getOrderItems = async (user) => {
    try {

        const query = `
        SELECT jt.product, jt.quantity, orderID
        FROM orders,
        JSON_TABLE(items, '$[*]' COLUMNS (
        product VARCHAR(100) PATH '$.product',
        quantity INT PATH '$.quantity'
        )) AS jt WHERE user = ?;
        `;

        const value = [user];

        const result = await executeQuery(query, value);

        return result;
        
    } catch (error) {

        console.log("Error fetching from orders table", error);
        
        
    }
};

export const getCompletedOrderItems = async (user) => {
    try {

        const query = `
        SELECT jt.product, jt.quantity
        FROM orders,
        JSON_TABLE(items, '$[*]' COLUMNS (
        product VARCHAR(100) PATH '$.product',
        quantity INT PATH '$.quantity'
        )) AS jt WHERE user = ?;
        `;

        const value = [user];

        const result = await executeQuery(query, value);

        return result;
        
    } catch (error) {

        console.log("Error fetching from orders table", error);
        
        
    }
};

export const getOrderItemsByUserAndOrderID = async (user, orderID) => {
    try {

        const query = `
        SELECT jt.product, jt.quantity, orderID
        FROM orders,
        JSON_TABLE(items, '$[*]' COLUMNS (
        product VARCHAR(100) PATH '$.product',
        quantity INT PATH '$.quantity'
        )) AS jt WHERE user = ? AND orderID = ?;
        `;

        const value = [user, orderID];

        const result = await executeQuery(query, value);

        return result;
        
    } catch (error) {

        console.log("Error fetching from orders table", error);
        
        
    }
};

// export const getSingleOrder = async(user) => {
//     try {

//         const query = `
//         SELECT * FROM orders WHERE user = ?
//         `;

//         const values = [user];

//         const results = await executeQuery(query, values);

//         return results;
        
//     } catch (error) {
//         console.log("Error fetching from orders table", error);
//     }
// };