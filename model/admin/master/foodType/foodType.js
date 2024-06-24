const mongoose = require("mongoose")

const foodtypeSchema = new mongoose.Schema({
    foodTypeName: String,
    tax: Number,
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("FoodType", foodtypeSchema)