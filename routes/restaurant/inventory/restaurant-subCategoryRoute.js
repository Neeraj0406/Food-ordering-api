const router = require("express").Router()
const { createSubCategory, getAllSubCategory } = require("../../../controller/restaurant/inventory/restaurant-subCategoryController")


router.post("/add", createSubCategory)
router.post("/getAll", getAllSubCategory)


module.exports = router