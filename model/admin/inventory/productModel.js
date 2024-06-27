const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName: String,
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
            addon: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Addon"
            }
        }
    ],
    price: Number,
    description: String,
    vegType: {
        type: Number,
        enum: [1, 2] //1 veg , 2 nonveg
    },
    tags: [String],



})

const Product = mongoose.model("Product", productSchema)
module.exports = Product