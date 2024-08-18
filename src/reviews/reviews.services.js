import { executeQuery } from "../config/database.js";

export const submitReviews = async(user, product, rating, comment) => {
    try {

        const query = `
        INSERT INTO reviews(user, product, rating, comment)
        VALUES(?, ?, ?, ?);
        `;

        const values = [user, product, rating, comment];

        await executeQuery(query, values);
        
    } catch (error) {
        console.log("Error submiting review", error);
    }
};

export const viewReviews = async(product) => {
    try {

        const query = `
        SELECT * FROM reviews WHERE product = ?
        `;

        const values = [product];

        const results = await executeQuery(query, values);

        return results;
        
    } catch (error) {
        console.log("Error fetching reviews", error);
    }
};