const { adminEditCategory, adminGetAllCategory, adminGetSingleCategory } = require("../../../controller/admin/inventory/categoryController")

const router = require("express").Router()


router.post("/edit", adminEditCategory)
router.post("/getAll", adminGetAllCategory)
router.get("/:id", adminGetSingleCategory)


module.exports = router