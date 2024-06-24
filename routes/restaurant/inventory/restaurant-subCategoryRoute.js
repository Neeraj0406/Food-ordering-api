const router = require("express").Router()
const { createSubCategory } = require("../../../controller/restaurant/inventory/restaurant-subCategoryController")


router.post("/add", createSubCategory)


module.exports = router