const Joi = require('joi');

const editCategoryValidation = Joi.object({

    id: Joi.string().required().messages({
        'any.required': 'Id is required'
    }),
    restaurantId: Joi.string().required().messages({
        'any.required': 'Restaurant id is required'
    }),
    categoryName: Joi.string().required().messages({
        'any.required': 'Category is required'
    }),
    status: Joi.boolean().required().messages({
        'any.required': 'Status is required',
        'boolean.base': 'Status must be true or false'
    })
});

module.exports = { editCategoryValidation };
