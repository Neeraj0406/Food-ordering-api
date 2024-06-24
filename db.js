const mongoose = require("mongoose")


const connectdb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/hungryslice")
        console.log("connection established with db");

    } catch (error) {
        console.log("Error while connecting db");
    }


}

connectdb()

module.exports = connectdb