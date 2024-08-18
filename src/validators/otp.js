import joi from "joi";

export const generateOtpSchema = joi.object({
    email: joi.string().email().required()
});

export const verifyOtpSchema = joi.object({
    email: joi.string().email().required(),
    otp: joi.number().min(6).required(),
    newPassword: joi.string().min(6).required()
});