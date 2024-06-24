const { addFoodtype, updateFoodtype, getFoodtype, getAllFoodType } = require("../../../../controller/admin/masterControler/foodtype/foodtype")

const router = require("express").Router()

//add foodtype
router.post("/add", addFoodtype)

//update 
router.post("/update", updateFoodtype)

//get food tyep 
router.get("/:id", getFoodtype)


//pagin foodtype
router.post("/pagin", getAllFoodType)

module.exports = router