const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    categoryName: String,
    status: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})


module.exports = mongoose.model("category", categorySchema)