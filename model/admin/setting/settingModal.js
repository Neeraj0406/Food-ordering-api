const mongoose = require("mongoose")

const settingSchema = new mongoose.Schema({
    payNowDiscount: {
        type: Number,
    },
    restaurantOrderCommission: {
        type: Number
    }
})


mongoose.exports = mongoose.model("Setting", settingSchema)