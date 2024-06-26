const mongoose = require("mongoose")

const addonSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    addonCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "addonCategory"
    },
    addonName: String,
    price: Number,
    vegType: {
        type: Number,
        enum: [1, 2] // 1 = veg , 2= nonveg
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Addon", addonSchema)