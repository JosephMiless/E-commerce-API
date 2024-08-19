import { regsiterUser, findUserByEmail, getProfile, updateUserProfile, resetPassword } from "./users.services.js";
import { sanitize } from "../utils/sanitizer.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { regsiterUserSchema, loginUserSchema, updateProfileSchema, resetPasswordSchema } from "../validators/users.js";
import { aToken, refToken } from "../utils/jwt.js";
import { generateOtp } from "../utils/otp.js";
import { sendOtp } from "../utils/email.js";
import {generateOtpSchema, verifyOtpSchema} from "../validators/otp.js";
import { saveRefreshToken, alterRefreshToken, fetchRefreshTokenByUser } from "../tokens/tokens.services.js";



export const regsiterUserController = async (req, res) => {
    try {
        
        const {error, value} = regsiterUserSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                error: error.message
            })
        };

        const { firstname, lastname, email, password} = value;

        const users = await findUserByEmail(email);

        if( users.length > 0 ) {
            return res.status(409).json({
                error: "User already exists"
            })
        };

        const hashedPassword = await hashPassword(password);

        const user = await regsiterUser(firstname, lastname, email, hashedPassword);

        return res.status(201).json({
            message: "User registered successfuly",
            user
        })

    } catch (error) {
        console.log("Error registering user", error);

        return res.status(400).json({
            error: "Error registering user"
        })
    }
};

export const loginUser = async(req, res) => {
    try {

        const {error, value} = loginUserSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                error: error.message
            });
        }

        const {email, password} = value;

        const users = await findUserByEmail(email);

        if (users.length == 0) {
            return res.status(404).json({
                error: "User not found"
            })
        };

        const userCredentals = users[0];

        const isMatch = await comparePassword(password, userCredentals.password);

        if (!isMatch) {
            return res.status(401).json({
                error: "Invalid user credentials"
            })
        };

        const userTokens = await fetchRefreshTokenByUser(userCredentals.email);

        const accessToken = aToken({email: userCredentals.email, is_valid: true });

        const refreshToken = refToken({id: userCredentals.email, is_valid: true});

        const hashedtoken = await hashPassword(refreshToken);


        if (userTokens.length > 0) {

            await alterRefreshToken(hashedtoken, userCredentals.email);

            return res.json({
                message: "User logged in successfuly",
                user: sanitize(userCredentals),
                accessToken, refreshToken });

        };

        await saveRefreshToken(userCredentals.email, hashedtoken);

        return res.json({
            message: "User logged in successfuly",
            user: sanitize(userCredentals),
            accessToken, refreshToken });
        
        
    } catch (error) {

        console.log("Error loging user", error);

        return res.status(400).json({
            error: "Error login in user"
        })

    };
};

export const getProfileController = async (req, res) => {
    try {
        
        const curr_user = req.user;

        if (!curr_user) {
            return res.status(401).json({
                error: "You can't access this endpoint. Please login."
            })
        };

        const profile = await getProfile(curr_user.email);

        return res.status(200).json({ 
            Profile_Details: sanitize(profile[0]) 
        });

    } catch (error) {
        
    }
};

export const updateUserProfileController = async (req, res) => {
    try {
        
        const curr_user = req.user;

        if (!curr_user) {
            return res.status(401).json({
                error: "You can't access this endpoint. Please login."
            })
        };

        const {error, value} = updateProfileSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                error: error.message
            })
        };

        const {firstname, lastname} = value;

        await updateUserProfile(firstname, lastname, curr_user.email);

        
        return res.status(201).json({ 
           message: "Profile details updated successfully"
        });

    } catch (error) {
        
    }
};

export const resetPasswordController = async (req, res) => {
    try {

        const curr_user = req.user;

        if (!curr_user) {
            return res.status(401).json({
                error: "You can't access this endpoint. Please login."
            })
        };

        const {error, value} = resetPasswordSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                error: error.message
            })
        };

        const {currentPassword, newPassword} = value;

        const users = await findUserByEmail(curr_user.email);

        const userCredentals = users[0];

        const isMatch = await comparePassword(currentPassword, userCredentals.password);

        if (!isMatch) {
            return res.status(401).json({
                error: "Invalid password"
            })
        };

        await resetPassword(newPassword, curr_user.email);

        return res.status(201).json({
            message: "Passwword reset sucessfully"
        })
        
    } catch (error) {

        console.log("Error resetting user password", error);

        return res.status(400).json({
            message: "Error resetting password"
        });
    }
};

export const generateOtpController = async (req, res) => {
    try {

        const {error, value} = generateOtpSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                error: error.message
            })
        };

        const {email} = value;

        const otp= generateOtp;

        const hashedOtp = await hashPassword(otp);

        await sendOtp(email, otp);

        await resetPassword(hashedOtp, email);

        return res.status(200).json({
            message: "OTP successfully sent to mail"
        })
        
    } catch (error) {

        console.log("Error generating otp", error);

        return res.status(400).json({
            error: "Error generating otp"
        })
        
    }
};

export const verifyOtpController = async (req, res) => {
    try {

        const {error, value} = verifyOtpSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                error: error.message
            })
        };

        const {email, otp, newPassword} = value;

        const users = await findUserByEmail(email);

        const userCredentals = users[0];

        console.log("user", userCredentals);

        const isMatch = await comparePassword(otp.toString(), userCredentals.password);

        if (!isMatch) {
            return res.status(401).json({
                error: "Invalid OTP"
            })
        };

        const hashedPassword = await hashPassword(newPassword);


        await resetPassword(hashedPassword, email);

        return res.status(200).json({
            message: "Password reset successfully"
        })
        
    } catch (error) {

        console.log("Error resetting password", error);

        return res.status(400).json({
            error: "Error resetting password"
        })
        
    }
};