import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { findUserByEmail } from '../users/users.services.js';

export const auth = async (req, res, next) =>{
    const authHeader = await req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({error: "Unauthorized, no authHeader"})
    }

    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({error: "Unauthorized, no token provided"})
    }
    jwt.verify(token, config.asecret, (error, user) => {
        if (error) {
            return res.status(403).json({error: "This session has expired. Kindly re-login"});
        }
        req.user = user;
        next();
    });
};

export const adminAuth = async (req, res, next) => {
    try {

        const user = req.user;

        const userProfile = await findUserByEmail(user.email);

        const role = userProfile[0].role;

        if(role != "admin") {
            return res.status(403).json({
                error: "You are not authorized to access this page"
            })
        };

        next();
        
    } catch (error) {
        res.status(500).json({
            error: `Internaal server error, ${error}`
        });
    }
};