import joi from "joi";

export const reviewsSchema = joi.object({
    product: joi.string().required(),
    rating: joi.number().required(),
    comment: joi.string().required()
});