const Joi = require("joi");

const createProductValidation = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().optional(),
    category: Joi.string().required(),
    stock: Joi.number().min(0).required(),
    image: Joi.string().optional()
});

const updateProductValidation = Joi.object({
    name: Joi.string().min(3),
    price: Joi.number().min(0),
    description: Joi.string().optional(),
    category: Joi.string(),
    stock: Joi.number().min(0),
    image: Joi.string().optional()
});

const idValidation = Joi.object({
    productId: Joi.string().hex().length(24).required()
});

const userIdValidation = Joi.object({
    userId: Joi.string().hex().length(24).required()
});

module.exports = {
    createProductValidation,
    updateProductValidation,
    idValidation,
    userIdValidation
};