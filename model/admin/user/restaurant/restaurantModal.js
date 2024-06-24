const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
    name: String,
    restaurantName: {
        type: String,
    },
    email: String,
    mobileNumber: Number,
    address1: String,
    address2: String,
    country: String,
    state: String,
    city: String,
    pinCode: String,
    fassaiNumber: Number,
    password: String,
    coverPhoto: String,
    aadharPhoto: [String],
    panPhoto: [String],
    foodLicensePhoto: [String],
    cancelChequePhoto: String,
    status: {
        type: Boolean,
        default: false // true = show , false = hide
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Restaurant", restaurantSchema)