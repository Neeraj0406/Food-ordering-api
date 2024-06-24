const router = require("express").Router()
const addCitiesRoute = require("./admin/master/addCities/addCitiesRoutes")
const foodTypeRoute = require("./admin/master/foodtype/foodtypeRoutes")
const authRoutes = require("./admin/auth/adminAuthRouters")
const restaurantRoutes = require("./admin/user/restaurant/restaurantRoute")
const { verifyAdminToken } = require("../middleware/middleware")


router.use("/auth", authRoutes)
router.use("/cities", verifyAdminToken, addCitiesRoute)
router.use("/foodtype", verifyAdminToken, foodTypeRoute)
router.use("/restaurant", verifyAdminToken, restaurantRoutes)


module.exports = router