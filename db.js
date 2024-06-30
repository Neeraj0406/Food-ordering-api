const mongoose = require("mongoose")
require('dotenv').config();


const connectdb = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT_URL)
        console.log("DB Connected");

    } catch (error) {
        console.log(error);

        console.log("Error while connecting db");
    }


}

connectdb()

module.exports = connectdb