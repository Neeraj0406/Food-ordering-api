const { addRestaurant, editRestaurant, getAllRestaurant, getSingleRestaurant } = require("../../../../controller/admin/user/restaurant/restaurantController")
const { verifyAdminToken } = require("../../../../middleware/middleware")
const upload = require("../../../../utils/multer")


const router = require("express").Router()

router.post("/add", upload.fields([
    { name: "coverPhoto", maxCount: 1 },
    { name: "aadharPhoto", maxCount: 2 },
    { name: "panPhoto", maxCount: 2 },
    { name: "foodLicensePhoto", maxCount: 2 },
    { name: "cancelChequePhoto", maxCount: 1 },
]), addRestaurant)

router.post("/edit/:id", upload.fields([
    { name: "coverPhoto", maxCount: 1 },
    { name: "aadharPhoto", maxCount: 2 },
    { name: "panPhoto", maxCount: 2 },
    { name: "foodLicensePhoto", maxCount: 2 },
    { name: "cancelChequePhoto", maxCount: 1 },
]), editRestaurant);

router.post("/getall", getAllRestaurant)

router.get("/:id", getSingleRestaurant)



module.exports = router