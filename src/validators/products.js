import joi from 'joi';

export const addProductSchema = joi.object({
    productName: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().greater(0).required(),
    category: joi.string().required(),
    stock: joi.number().required()
});

export const updateProductSchema = joi.object({
    productName: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().greater(0).required(),
    category: joi.string().required(),
    stock: joi.number().required()
});