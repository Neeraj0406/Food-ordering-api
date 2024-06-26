const { addAddon, getAllAddon } = require("../../../controller/restaurant/inventory/restaurant-addonController")

const router = require("express").Router()

router.post('/add', addAddon)
router.post('/getAll', getAllAddon)

module.exports = router