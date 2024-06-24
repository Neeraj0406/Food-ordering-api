
const FoodType = require("../../../../model/admin/master/foodType/foodType");


const addFoodtype = async (req, res) => {
    try {
        const { foodTypeName, tax } = req.body
        const newFoodtype = await FoodType.create({ foodTypeName, tax })
        res.status(201).json({
            message: "Food type added successfully",
            json: newFoodtype
        })
    } catch (error) {
        console.log(error);

    }
}

const updateFoodtype = async (req, res) => {
    try {
        const { foodTypeName, tax, id } = req.body
        const updatedFoodtype = await FoodType.findByIdAndUpdate(
            { _id: id },
            { $set: { foodTypeName, tax } },
            { new: true }
        )
        res.status(201).json({
            message: "Food type updated successfully",
            json: updatedFoodtype
        })
    } catch (error) {
        console.log(error);

    }
}

const getFoodtype = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "Id is missing" })
        }
        const data = await FoodType.findById(id)
        return res.status(400).json({ data: data })

    } catch (error) {
        console.log(error);

    }
}


const getAllFoodType = async (req, res) => {
    try {
        const { pageNumber, pageSize, } = req.body


        const skipCondition = {
            skip: (pageNumber - 1) * pageSize,
            limit: pageSize
        }

        const foodType = await FoodType.find({}, {}, skipCondition)
        const totalCount = await FoodType.countDocuments()
        res.status(200).json({
            data: foodType,
            totalCount: totalCount
        })


    } catch (error) {
        console.log(error);

    }
}

module.exports = {
    addFoodtype, updateFoodtype, getFoodtype, getAllFoodType
}