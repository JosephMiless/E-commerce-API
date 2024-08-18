import { executeQuery } from "../config/database.js";

export const createProductsTable = async () => {
    try {
        
        const query = `
        CREATE TABLE IF NOT EXISTS products(
        productName VARCHAR(50) NOT NULL PRIMARY KEY,
        description VARCHAR(100) NOT NULL,
        price DOUBLE PRECISION NOT NULL,
        category VARCHAR(50) NOT NULL,
        stock INT NOT NULL,
        imageUrl VARCHAR(255) DEFAULT("URL") NOT NULL
        );
        `;

        const results = await executeQuery(query, []);

        return results;

    } catch (error) {
        console.log("Error creating products table");
    }
};