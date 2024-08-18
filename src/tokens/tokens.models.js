import { executeQuery } from "../config/database.js";

export const createTokenTable = async () => {
    try {
        const query = `
    CREATE TABLE IF NOT EXISTS tokens(
    user VARCHAR(255) NOT NULL,
    tokens VARCHAR(255) NOT NULL PRIMARY KEY,
    FOREIGN KEY (user) REFERENCES users(email)
    );
    `;

    await executeQuery(query, []);
    } catch (error) {
        console.log("Error creating tokens table", error);
    }
};