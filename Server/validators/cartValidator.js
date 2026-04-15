const Joi = require("joi");

const addToCartValidation = Joi.object ({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).optional()
});

const updateItemValidation = Joi.object ({
    quantity: Joi.number().min(1).required()
});

module.exports = {
    addToCartValidation,
    updateItemValidation
};