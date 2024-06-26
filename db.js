const mongoose = require("mongoose")
require('dotenv').config();


const connectdb = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("connection established with db");

    } catch (error) {
        console.log(error);

        console.log("Error while connecting db");
    }


}

connectdb()

module.exports = connectdb