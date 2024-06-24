const router = require("express").Router()
const categoryRoute = require("./categoryRoute")

router.use("", categoryRoute)



module.exports = router