const mongoose = require("mongoose")


const addonCategorySchema = new mongoose.Schema({
    addonCategoryName: String,
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    status: {
        type: Boolean,
        // default: false
        default: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("addonCategory", addonCategorySchema)