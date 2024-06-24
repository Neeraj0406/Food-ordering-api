const router = require("express").Router()
const { verifyRestaurantToken } = require("../../../middleware/middleware")
const categoryRoutes = require("./restaurant-categoryRoute")
const subCategoryRoutes = require("./restaurant-subCategoryRoute")

router.use("/category", categoryRoutes)
router.use("/sub-category", subCategoryRoutes)

module.exports = router