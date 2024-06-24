const express = require("express")
const app = express.Router()
// const fxn = require("../../../controller/masterControler/addCities/addCityController")
const fxn = require("../../../../controller/admin/masterControler/addCities/addCityController")


app.post("/add", fxn.addCities)

    

module.exports = app