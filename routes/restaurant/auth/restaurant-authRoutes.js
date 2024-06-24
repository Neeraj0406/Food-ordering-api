const { createRestaurant, loginRestaurant } = require("../../../controller/restaurant/auth/restaurant-authController")

const router = require("express").Router()


router.post("/create-restaurant", createRestaurant)
router.post("/login", loginRestaurant)




module.exports = router