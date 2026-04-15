const Joi = require("joi");

const updateOrderStatusValidation = Joi.object({
    params: Joi.object({
        orderId: Joi.string().hex().length(24).required()
    }),
    body: Joi.object({
        status: Joi.string()
            .valid("pending", "shipped", "delivered", "cancelled")
            .required()
    })
});

module.exports = {
    updateOrderStatusValidation
};