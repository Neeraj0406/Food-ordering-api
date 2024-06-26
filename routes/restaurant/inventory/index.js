const router = require("express").Router()
const { verifyRestaurantToken } = require("../../../middleware/middleware")
const categoryRoutes = require("./restaurant-categoryRoute")
const subCategoryRoutes = require("./restaurant-subCategoryRoute")
const addonCategoryRoutes = require("./restaurant-addonCategoryRoute")
const addonRoutes = require("./restaurant-addonRoute")

router.use("/category", categoryRoutes)
router.use("/sub-category", subCategoryRoutes)
router.use("/addon-category", addonCategoryRoutes)
router.use("/addon", addonRoutes)

module.exports = router