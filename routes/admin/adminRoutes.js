const router = require("express").Router()
const addCitiesRoute = require("./master/addCities/addCitiesRoutes")
const foodTypeRoute = require("./master/foodtype/foodtypeRoutes")
const authRoutes = require("./auth/adminAuthRouters")
const restaurantRoutes = require("./user/restaurant/restaurantRoute")
const inventoryRoutes = require("./inventory/index")
const { verifyAdminToken } = require("../../middleware/middleware")



//admin panel
router.use("/auth", authRoutes)
router.use("/cities", verifyAdminToken, addCitiesRoute)
router.use("/foodtype", verifyAdminToken, foodTypeRoute)
router.use("/restaurant", verifyAdminToken, restaurantRoutes)
router.use("/admin-inventory", verifyAdminToken, inventoryRoutes)



// restaurant panel
router.use("/inventory", verifyAdminToken, inventoryRoutes)


module.exports = router