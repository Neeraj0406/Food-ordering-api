const { showServerError, showError, showResponse } = require("../../../common-modules.js/helper");
const Addon = require("../../../model/admin/inventory/addonModel");
const { addonValidation } = require("../../../utils/restaurantValidation");


const addAddon = async (req, res) => {
    try {
        const { addonCategory, addonName, price, vegType } = req.body;
        const restaurantId = req.restaurantId

        const { error } = addonValidation.validate({ addonCategory, addonName, price, vegType })

        if (error) {
            return showError(res, error.details[0].message)
        }

        console.log("continue")

        const addonNamePresent = await Addon.findOne({ addonName })


        if (addonNamePresent) {
            return showError(res, "Addon name is already present ")
        }

        const newAddon = await Addon.create({
            addonCategory, addonName, price, vegType, restaurantId
        })

        return showResponse(res, newAddon, "Addon added successfully")

    } catch (error) {
        console.log(error)
        showServerError(res)
    }
}


const getAllAddon = async (req, res) => {
    try {
        let { pageSize, pageNumber, searchString } = req.body
        pageSize = Number(pageSize)
        pageNumber = Number(pageNumber)

        let con = {
            restaurantId: req.restaurantId,
            status: true
        }
        if (searchString) {
            const regex = new RegExp(searchString, "i")
            con["$or"] = [
                { addonName: regex },
            ]
        }

        const skipCondition = {
            sort: { createdAt: -1 },
            skip: (pageNumber - 1) * pageSize,
            limit: pageSize
        }

        const allAddon = await Addon.find(con, {}, skipCondition).populate([
            { path: "restaurantId", select: "name restaurantName" },
            { path: "addonCategory", select: "addonCategoryName" }
        ])
        const totalCount = await Addon.countDocuments(con)

        return showResponse(res, { allAddon, totalCount })




    } catch (error) {
        showServerError(res)
    }
}



module.exports = { addAddon, getAllAddon }