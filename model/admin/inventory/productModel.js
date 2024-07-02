const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName: String,
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    foodType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodType"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory"
    },
    allAddons: [
        {
            addonCategory: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "addonCategory"
            },
            addon: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Addon"
            }]
        }
    ],
    price: Number,
    description: String,
    vegType: {
        type: Number,
        enum: [1, 2] //1 veg , 2 nonveg
    },
    tags: {
        recommended: {
            type: Boolean,
            default: false
        },
        spicy: {
            type: Boolean,
            default: false
        },
        noGarlicOnion: {
            type: Boolean,
            default: false
        },
        glutenFree: {
            type: Boolean,
            default: false
        },
        vegan: {
            type: Boolean,
            default: false
        },
    },
    status: {
        type: Boolean,
        default: true
    }


})

const Product = mongoose.model("Product", productSchema)
module.exports = Product