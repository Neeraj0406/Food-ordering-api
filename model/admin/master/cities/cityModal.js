const mongoose = require("mongoose")

const citySchema = new mongoose.Schema({
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    CountryName: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("City", citySchema)