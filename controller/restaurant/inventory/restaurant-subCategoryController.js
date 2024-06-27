const { showError, showResponse, showServerError } = require("../../../common-modules.js/helper")
const SubCategory = require("../../../model/admin/inventory/subCategoryModal")
const { subCategoryValidation, paginationValidation } = require("../../../utils/restaurantValidation")

const createSubCategory = async (req, res) => {
    try {
        const { categoryId, subCategoryName } = req.body
        const data = {
            categoryId, subCategoryName, restaurantId: req.restaurantId
        }
        console.log(data)
        const { error } = subCategoryValidation.validate(data)

        if (error) {
            return showError(res, error.details[0].message)
        }

        const alreadyPresent = await SubCategory.findOne({ subCategoryName: new RegExp(`^${subCategoryName}$`) })

        if (alreadyPresent) {
            return showError(res, "Sub Category is already present")
        }

        const newSubCategory = await SubCategory.create(data)

        return showResponse(res, newSubCategory)


    } catch (error) {
        return showServerError(res)
    }
}


const getAllSubCategory = async (req, res) => {
    try {
        const { pageNumber, pageSize, searchString } = req.body

        const { error } = paginationValidation.validate({ pageNumber, pageSize })

        if (error) {
            return showError(res, error.details[0].message)
        }

        const con = {
            restaurantId: req.restaurantId,
            status: true
        }

        if (searchString) {
            con.searchString = new RegExp(searchString, "i")
        }

        const skipConditions = {
            sort: { createAt: -1 },
            skip: (pageNumber - 1) * pageSize,
            limit: pageSize
        }

        const subCategories = await SubCategory.find(con, { categoryId: 1, subCategoryName: 1, restaurantId: 1 }, skipConditions).populate({
            path: "restaurantId",
            select: "restaurantName  name"
        })
        const totalDocuments = await SubCategory.countDocuments(con)
        return showResponse(res, { subCategories, totalDocuments })

    } catch (error) {
        showServerError(res)
    }
}


module.exports = { createSubCategory, getAllSubCategory }