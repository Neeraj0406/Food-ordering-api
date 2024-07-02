const router = require("express").Router()
const categoryRoute = require("./categoryRoute")
const subCategoryRoute = require("./subCategoryRoute")


//  *Note this page all path is using in the api, do change path in api if changing api url


//pending inventory route 
router.use("/pending-category", categoryRoute)
router.use("/pending-subCategory", subCategoryRoute)




// inventory route
router.use("/category", categoryRoute)
router.use("/subCategory", subCategoryRoute)




//  *Note this page all path is using in the api, do change path in api if changing api url

module.exports = router