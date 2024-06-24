const { createSetting, getSetting, updateSetting } = require("../../../controller/admin/setting/settingController")

const router = require("express").Router()


router.post("/create", createSetting)
router.get("/get", getSetting)
router.post("/update", updateSetting)


module.exports = router