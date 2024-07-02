const router = require("express").Router()
const { verifyRestaurantToken } = require("../../../middleware/middleware")
const categoryRoutes = require("./restaurant-categoryRoute")
const subCategoryRoutes = require("./restaurant-subCategoryRoute")
const addonCategoryRoutes = require("./restaurant-addonCategoryRoute")
const addonRoutes = require("./restaurant-addonRoute")
const productRoutes = require("./restaurant-productRoute")

router.use("/category", categoryRoutes)
router.use("/sub-category", subCategoryRoutes)
router.use("/addon-category", addonCategoryRoutes)
router.use("/addon", addonRoutes)
router.use("/product", productRoutes)

module.exports = router