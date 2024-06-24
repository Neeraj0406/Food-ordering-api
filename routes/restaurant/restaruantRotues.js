const router = require("express").Router()
const authRoutes = require("./auth/restaurant-authRoutes")

router.use("/auth", authRoutes)

module.exports = router