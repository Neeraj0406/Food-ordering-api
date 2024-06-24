const { login, createAdmin } = require("../../../controller/admin/auth/authController")

const router = require("express").Router()

router.post("/login", login)
router.post("/create-admin", createAdmin)


module.exports = router