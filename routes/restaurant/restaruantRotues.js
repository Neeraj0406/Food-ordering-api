const router = require("express").Router()
const { verifyRestaurantToken } = require("../../middleware/middleware")
const authRoutes = require("./auth/restaurant-authRoutes")
const inventoryRoutes = require("./inventory/index")

router.use("/auth", authRoutes)
router.use("/inventory", verifyRestaurantToken, inventoryRoutes)

module.exports = router