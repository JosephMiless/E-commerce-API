import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port : process.env.PORT,
    db:{
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    asecret: process.env.ACCESS_SECRET_KEY,
    rsecret: process.env.REFRESH_SECRET_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    api_key: process.env.CLOUDINARY_KEY,
    cloud_name: process.env.CLOUDINARY_NAME,
    pay_secret: process.env.PAYSTACK_SECRET_KEY,
    email:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
};