import { executeQuery } from "../config/database.js";

export const createOrdersTbale = async () => {
    try {

        const query = `
        CREATE TABLE IF NOT EXISTS orders(
        orderID VARCHAR(255) NOT NULL PRIMARY KEY,
        user VARCHAR(255) NOT NULL, 
        items JSON NOT NULL,
        total_amount DOUBLE PRECISION NOT NULL,
        status VARCHAR(10) DEFAULT('pending') NOT NULL,
        FOREIGN KEY (user) REFERENCES users(email)
        );
        `;
        await executeQuery(query, []);
        
    } catch (error) {
        console.log("Error creating orders table", error);
    }
}