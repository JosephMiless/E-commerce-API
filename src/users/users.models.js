import {executeQuery} from '../config/database.js';

export const createUsersTables = async() => {
try {
    const query = `
    CREATE TABLE IF NOT EXISTS users(
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(70) UNIQUE NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'customer'
    );
    `;

    await executeQuery(query, []);
} catch (error) {
    console.log("Error creating users table", error);
}
};