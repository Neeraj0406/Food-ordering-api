const router = require("express").Router()
const { createProduct, getAllProduct } = require("../../../controller/restaurant/inventory/restaurant-productController")


router.post("/add", createProduct)

router.post("/getAll", getAllProduct)


module.exports = router