const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String,
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    role: {
        type: Number,
        default: 1,
        enum: [1, 2, 3]  //1customer  , 2 merchant, 3 admin
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Auth", authSchema)