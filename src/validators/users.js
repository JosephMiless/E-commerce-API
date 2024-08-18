import joi from 'joi';

export const regsiterUserSchema = joi.object({
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

export const loginUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

export const updateProfileSchema = joi.object({
    firstname: joi.string().required(),
    lastname: joi.string().required()
});

export const resetPasswordSchema = joi.object({
    currentPassword: joi.string().required(),
    newPassword: joi.string().required()
});