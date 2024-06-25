const router = require("express").Router()
const { verifyRestaurantToken } = require("../../../middleware/middleware")
const categoryRoutes = require("./restaurant-categoryRoute")
const subCategoryRoutes = require("./restaurant-subCategoryRoute")
const addonCategoryRoutes = require("./restaurant-addonCategoryRoute")

router.use("/category", categoryRoutes)
router.use("/sub-category", subCategoryRoutes)
router.use("/addon-category", addonCategoryRoutes)

module.exports = router