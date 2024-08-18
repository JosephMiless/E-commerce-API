import Joi from "joi";

export const verifyPaymentSchema = Joi.object({
    reference: Joi.string().required()
});