import joi from 'joi';

export const addToCartSchema = joi.object({
    product: joi.string().required(),
    quantity: joi.number().required()
});

export const removeFromCart = joi.object({
    productName: joi.string().required()
});