const { showServerError, showError, showResponse } = require("../../../common-modules.js/helper");
const Addon = require("../../../model/admin/inventory/addonModel");
const { addonValidation } = require("../../../utils/restaurantValidation");


const addAddon = async (req, res) => {
    try {
        const { addonCategory, addonName, price, vegType } = req.body;
        const restaurantId = req.body

        const { error } = addonValidation.validate({ addonCategory, addonName, price, vegType })

        if (error) {
            return showError(res, error.details[0].message)
        }

        const addonNamePresent = await Addon.findOne({ addonName })


        if (addonNamePresent) {
            return showError(res, "Addon name is already present ")
        }

        const newAddon = await Addon.create({
            addonCategory, addonName, price, vegType, restaurantId
        })

        return showResponse(res, newAddon, "Addon added successfully")

    } catch (error) {
        showServerError(res)
    }
}


const getAllAddon = async (req, res) => {
    try {

    } catch (error) {
        showServerError(res)
    }
}



module.exports = { addAddon, getAllAddon }