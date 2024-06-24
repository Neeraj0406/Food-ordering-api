const mongoose = require("mongoose")

const addcitySchema = new mongoose.Schema({
    city: String,
    state: String,
    isCapital: Boolean
})

module.exports = mongoose.model("AddCities", addcitySchema)