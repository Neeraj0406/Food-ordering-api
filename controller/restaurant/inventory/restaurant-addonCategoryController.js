const { showError, showServerError, showResponse } = require("../../../common-modules.js/helper")
const AddonCategory = require("../../../model/admin/inventory/addonCategoryModel")
const { addonCategoryValidation, paginationValidation } = require("../../../utils/restaurantValidation")


const addAddonCategory = async (req, res) => {
    try {
        let data = req.body

        const { error } = addonCategoryValidation.validate(data)

        if (error) {
            return showError(res, error.details[0].message)
        }

        const addonCatAlreadyPresent = await AddonCategory.findOne({ addonCategoryName: data.addonCategoryName })

        if (addonCatAlreadyPresent) {
            return showError(res, "Addon Category is already present")
        }

        const newAddonCategory = await AddonCategory.create({ addonCategoryName: data.addonCategoryName, restaurantId: req.restaurantId })
        return showResponse(res, newAddonCategory, "Addon category has been added")

    } catch (error) {
        showServerError(res)
    }
}

const getAllAddonCategory = async (req, res) => {
    try {
        let { pageNumber, pageSize, serachString } = req.body
        pageNumber = Number(pageNumber)
        pageSize = Number(pageSize)


        const { error } = paginationValidation.validate({ pageNumber, pageSize })

        if (error) {
            return showError(res, error.details[0].message)
        }

        let con = {
            restaurantId: req.restaurantId,
            status: true
        }
        if (serachString) {
            con.serachString = new RegExp(serachString, "i")
        }

        let skipCondition = {
            sort: { created: -1 },
            skip: (pageNumber - 1) * pageSize,
            limit: pageSize
        }


        const allAddonCategory = await AddonCategory.find(con, {}, skipCondition).populate({ path: "restaurantId", select: "name restaurantName" })
        const totalCount = await AddonCategory.countDocuments(con)


        return showResponse(res, { allAddonCategory, totalCount })

    } catch (error) {
        showServerError(res)
    }
}


module.exports = { addAddonCategory, getAllAddonCategory }