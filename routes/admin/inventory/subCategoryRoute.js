const { adminEditSubCategory, adminGetAllSubCategory, adminGetSingleSubCategory } = require("../../../controller/admin/inventory/subCategoryController")

const router = require("express").Router()


router.post("/edit", adminEditSubCategory)
router.post("/getAll", adminGetAllSubCategory)
router.get("/:id", adminGetSingleSubCategory)


module.exports = router