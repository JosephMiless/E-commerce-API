import { executeQuery } from "../config/database.js";

export const addProducts = async (productName, description, price, category, stock) => {
    try {
        
        const query = `
        INSERT INTO products(productName, description, price, category, stock)
        VALUES(?, ?, ?, ?, ?)
        `;

        const values = [productName, description, price, category, stock];

        const results = await executeQuery(query, values);

        return results;

    } catch (error) {
        console.log("Error adding product", error);

        return res.status(400).json({
            error: "Error adding product"
        })
    }
};

export const updateProducts = async (productName, description, price, category, stock, productID) => {
    try {
        
        const query = `
        UPDATE products
        SET productName = ?, description = ?, price = ?, category = ?, stock = ?
        WHERE productName = ?
        `;

        const values = [productName, description, price, category, stock, productID];

        const results = await executeQuery(query, values);

        return results;

    } catch (error) {

        console.log("Error updating product", error);
    }
};

export const updateProductsStock = async (amount, productName) => {
    try {
        
        const query = `
        UPDATE products
        SET stock = stock - ?
        WHERE productName = ?
        `;

        const values = [amount, productName];

        const results = await executeQuery(query, values);

        return results;

    } catch (error) {

        console.log("Error updating product", error);
    }
};

export const deleteProducts = async (productName) => {
    try {
        
        const query = `
        DELETE FROM products WHERE productName = ?;
        `;

        const values = [productName];

        const results = await executeQuery(query, values);

        return results;

    } catch (error) {

        console.log("Error deleting product", error);

    }
};

export const findProducts = async (productName) => {
    try {
        
        const query = `
        SELECT * FROM products WHERE productName = ?;
        `;

        const values = [productName];

        const results = await executeQuery(query, values);

        return results;

    } catch (error) {
        console.log("Error fetching product", error);

    }
};

export const getProducts = async(req, res) => {
    try {

        const query = `
        SELECT * FROM products
        `;

        const results = await executeQuery(query, []);

        //console.log("Products", results);

        return results;
        
    } catch (error) {
        console.log("Error getting products", error);

    }
};

export const saveImageUrl = async(image, productName) => {
    try {

        const query = `
        UPDATE products
        SET imageUrl = ?
        WHERE productName = ?
        `;

        const values = [image, productName];

        await executeQuery(query, values);

    } catch (error) {
        console.log("Error uploading image", error);
    }
};