import { executeQuery } from "../config/database.js";

export const createCartTable = async () => {
    try {

        const query = `
        CREATE TABLE IF NOT EXISTS cart(
        user VARCHAR(255) NOT NULL,
        product VARCHAR(55) NOT NULL,
        quantity INT NOT NULL,
        price DOUBLE PRECISION NOT NULL,
        FOREIGN KEY (user) REFERENCES users(email),
        FOREIGN KEY (product) REFERENCES products(productName)
        );
        `;

        const results = await executeQuery(query, []);

        return results;
        
    } catch (error) {

        console.log("Error creating cart table", error);
    
    }
};