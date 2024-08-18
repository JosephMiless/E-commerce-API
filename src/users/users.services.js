import { executeQuery } from "../config/database.js";

export const regsiterUser = async( firstname, lastname, email, password) => {
    try {
        
        const query = `
        INSERT INTO users(firstname, lastname, email, password)
        VALUES(?, ?, ?, ?);
        `;

        const values = [firstname, lastname, email, password];

        const results = await executeQuery(query, values);

        return results;

    } catch (error) {
        console.log("Error inserting into users table", error);
    }
};

export const findUserByEmail = async(email) => {
    try {
        
        const query = `
        SELECT * FROM users WHERE email = ?
        `;

        const user = await executeQuery(query, [email]);

        return user;

    } catch (error) {
        console.log("Error finding user", error);
    }
};

export const getProfile = async (email) => {
    try {

        const query = `
        SELECT * FROM users WHERE email = ?
        `;

        const values = [email];

        const results = await executeQuery(query, values);

        return results;
        
    } catch (error) {

        console.log("Error getting profile", error);

        return res.status(400).json({
            error: "Error getting profile"
        });

    }
};

export const updateUserProfile = async(firstname, lastname, email) => {
    try {

        const query = `
        UPDATE users
        SET firstname = ?, lastname = ?,
        WHERE email = ?
        `;

        const value = [firstname, lastname, email];

        await executeQuery(query, value);
        
    } catch (error) {
        console.log("Error updating user table");
    }
};

export const resetPassword = async(password, email) => {
    try {

        const query = `
        UPDATE users
        SET password = ?
        WHERE email = ?
        `;

        const value = [password, email];

        await executeQuery(query, value);
        
    } catch (error) {
        console.log("Error updating user table");
    }
};