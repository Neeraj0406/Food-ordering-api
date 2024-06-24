const Joi = require("joi")


// name, restaurantName, address1, email, mobileNumber, password, accectTerms
const createRestaurantValidation = Joi.object({
    address1: Joi.string()
        .required()
        .min(2)
        .trim()
        .messages({
            "string.empty": "address is requried",
            "string.min": "Address must have alteast more than 2 character"
        }),
    name: Joi.string().required().messages({ "*": "Name is required" }),
    restaurantName: Joi.string().required().messages({ "*": "Restaurant name is required" }),
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email is required"
    }),
    mobileNumber: Joi.number().required().integer().min(1000000000).max(9999999999).messages({
        'number.base': 'Mobile number must be a valid number',
        "number.integer": "Mobile number must be integer",
        "number.min": "Mobile number is not valid",
        "number.max": "Mobile number is not valid",
        'any.required': 'Mobile number is required',
    }),
    password: Joi.string().required().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})')).messages({
        "string.empty": "Password is required",
        "string.pattern.base": "Password must have atleast one uppercase one lowercase and one special character",
        "string.min": "Password must have alteast 8 character"
    }),
    acceptTerms: Joi.boolean()
        .valid(true)
        .required()
        .messages({
            'boolean.base': 'Terms and conditions must be a boolean value',
            'any.only': 'Terms and conditions must be true',
            'any.required': 'Terms and conditions are required',
        }),
})




const loginValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.required": "Email is required",
        "string.email": "Email must be a valid email"
    }),
    password: Joi.string().required().messages({
        "string.empty": "Password is required"
    })
})


const addCategoryValidation = Joi.object({
    categoryName: Joi.string().required().messages({
        "*": "Category name is required"
    })
})


const paginationValidation = Joi.object({
    pageNumber: Joi.number().integer().required().messages({
        "number.integer": "Page number must be integer",
        "number.empty": "Page number is required"
    }),
    pageSize: Joi.number().integer().required().messages({
        "number.integer": "Page Size must be integer",
        "number.empty": "Page Size is required"
    }),
})


const subCategoryValidation = Joi.object({
    categoryId: Joi.string().required().messages({
        "string.empty": "Category is required",
    }),
    subCategoryName: Joi.string().required().messages({
        "string.empty": "Sub Category is required",
    }),
    restaurantId: Joi.string().required().messages({
        "string.empty": "Restaurant Id is required",
    }),
});



module.exports = { createRestaurantValidation, loginValidationSchema, addCategoryValidation, paginationValidation, subCategoryValidation }