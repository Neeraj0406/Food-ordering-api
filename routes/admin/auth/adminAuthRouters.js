const { login, createAdmin } = require("../../../controller/auth/authController")

const router = require("express").Router()

router.post("/login", login)
router.post("/create-admin", createAdmin)


module.exports = router