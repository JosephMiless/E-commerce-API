import { executeQuery } from "../config/database.js";

export const saveRefreshToken = async (userID, tokens) => {

    try {
        
        const query = `
        INSERT INTO tokens (user, tokens)
        VALUES(?, ?)
        `;

        const values = [userID, tokens];

        const results = await executeQuery(query, values);

        return results;

    } catch (error) {
        console.log("Error inseerting into tokens table", error);
    }
};

export const fetchRefreshToken = async (token, user) => {
    try {

        const query = `
        SELECT * FROM tokens WHERE tokens = ? AND user = ?
        `;

        const value = [token, user];

        const results = await executeQuery(query, value);

        return results;
        
    } catch (error) {
        console.log("Error fetching data from tokens table");
        
    }
};

export const fetchRefreshTokenByUser = async (user) => {
    try {

        const query = `
        SELECT * FROM tokens WHERE user = ?
        `;

        const value = [user];

        const results = await executeQuery(query, value);

        return results;
        
    } catch (error) {
        console.log("Error fetching data from tokens table");
        
    }
};

export const logout = async (user) => {
    try {

        const query = `
        DELETE FROM tokens WHERE user = ?
        `;

        const value = [user];

        await executeQuery(query, value);
        
    } catch (error) {
        console.log("Error deleting from tokens table");
        
    }
};

export const alterRefreshToken = async (tokens, userID) => {

    try {
        
        const query = `
        UPDATE tokens
        SET tokens = ?
        WHERE user = ?
        `;

        const values = [tokens, userID];

        const results = await executeQuery(query, values);

        return results;

    } catch (error) {
        console.log("Error inseerting into tokens table", error);
    }
};