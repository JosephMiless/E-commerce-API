import { executeQuery } from "../config/database.js";

export const createReviewsTable = async() =>{
    try {

        const query = `
        CREATE TABLE IF NOT EXISTS reviews(
        user VARCHAR(255) NOT NULL,
        product VARCHAR(255) NOT NULL,
        rating INT NOT NULL,
        comment VARCHAR(100),
        FOREIGN KEY(user) REFERENCES users(email),
        FOREIGN KEY(product) REFERENCES products(productName)
        );
        `;

        await executeQuery(query, []);
        
    } catch (error) {
        console.log("Error creating reviews table", error);
    }
};