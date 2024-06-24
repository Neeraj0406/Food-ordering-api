const Setting = require("../../../model/admin/setting/settingModal")

const createSetting = async (req, res) => {
    try {
        const { payNowDiscount, restaurantOrderCommission } = req.body

        const newSetting = await Setting.create({ payNowDiscount, restaurantOrderCommission })
        res.status(201).json({
            message: "setting created successfully",
            data: newSetting
        })

    } catch (error) {
        console.log(error)
    }
}

const getSetting = async (req, res) => {
    try {
        const setting = await Setting.find()
        res.status(201).json({
            message: "setting created successfully",
            data: setting[0]
        })
    } catch (error) {
        console.log(error)
    }
}


const updateSetting = async (req, res) => {
    try {
        const { payNowDiscount, restaurantOrderCommission, id } = req.body
        const foundSetting = await Setting.findById(id)

        if (!foundSetting) {
            return res.status(400).json({
                message: "Setting not found "
            })
        }

        const updatedSetting = await Setting.findByIdAndUpdate(
            { _id: id }, { payNowDiscount, restaurantOrderCommission }, { new: true }
        )

        res.status(201).json({
            message: "setting created successfully",
            data: updatedSetting
        })

    } catch (error) {
        console.log(error)
    }
}


module.exports = { createSetting, getSetting, updateSetting }