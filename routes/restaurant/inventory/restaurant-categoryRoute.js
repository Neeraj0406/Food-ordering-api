const router = require("express").Router()
const { createCategory, getAllCategory } = require("../../../controller/restaurant/inventory/restaurant-categoryContoller")


router.post("/add", createCategory)
router.post("/getAll", getAllCategory)



module.exports = router