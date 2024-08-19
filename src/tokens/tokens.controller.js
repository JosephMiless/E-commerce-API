import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { refreshTokenSchema } from "../validators/token.js";
import { fetchRefreshTokenByUser, logout } from "./tokens.services.js";
import { aToken } from "../utils/jwt.js";
import { comparePassword } from '../utils/bcrypt.js';


export const refreshTokenController = async (req, res) => {
    try {

        const {error, value} = refreshTokenSchema.validate(req.body);

        const {token} = value;

        if (error) {
            return res.status(400).json({
                error: error.message
            })
        };

        const decoded = jwt.decode(token);

        const tokenExists = await fetchRefreshTokenByUser(decoded.id);

        if (tokenExists.length == 0) {
            return res.status(404).json({
                error: "This session has expired. kindly re-login"
            })
        };        

        const isMatch = await comparePassword(token, tokenExists[0].tokens);


        if (!isMatch ) {
            return res.status(400).json({
                error: "Invalid token"
            })
        };

        jwt.verify(token, config.rsecret, (error, user) => {
            if (error) {
                return res.status(403).json({error: "This session has expired. Kindly re-login"});
            };

            const accessToken = aToken({email: decoded.id});
                        
            return res.status(200).json({
                accessToken: accessToken
            });
            
        })
        
    } catch (error) {

        console.log("Rferesh token error", error);

        return res.status(400).json({
            error: "Refresh token error"
        })
        
        
    }
};

export const logoutController = async (req, res) => {
    try {

        const loggedInUser = req.user;

        if (!loggedInUser) {
            return res.status(401).json({
                error: "Unauthorized"
            })
        };

        await logout(loggedInUser.email);

        return res.status(200).json({
            message: "User logged out successfully"
        });
        
    } catch (error) {

        console.log("Error logging user out", error);

        return res.status(400).json({
            error: "Error logging out"
        })
        
        
    }
};