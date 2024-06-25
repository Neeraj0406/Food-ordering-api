const router = require("express").Router()
const { addAddonCategory, getAllAddonCategory } = require("../../../controller/restaurant/inventory/restaurant-addonCategoryController")


router.post("/add", addAddonCategory)
router.post("/getAll", getAllAddonCategory)

module.exports = router