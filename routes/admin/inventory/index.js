const router = require("express").Router()
const categoryRoute = require("./categoryRoute")


//  *Note this page all path is using in the api, do change path in api if changing api url


//pending inventory route 
router.use("/pending-category", categoryRoute)




// inventory route
router.use("/category", categoryRoute)



//  *Note this page all path is using in the api, do change path in api if changing api url

module.exports = router