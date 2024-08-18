import joi from "joi";

export const refreshTokenSchema = joi.object({
    token: joi.string().required()
});