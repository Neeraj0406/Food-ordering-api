const { showServerError, showError, showResponse } = require("../../../common-modules.js/helper")
const Category = require("../../../model/admin/inventory/categoryModel")
const { addCategoryValidation, paginationValidation } = require("../../../utils/restaurantValidation")


const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body
        const { error } = addCategoryValidation.validate({ categoryName })

        if (error) {
            return showError(res, error.details[0].message)
        }
        const alreadyPresent = await Category.findOne({ categoryName: new RegExp(`^${categoryName}$`) })

        if (alreadyPresent) {
            return showError(res, "Category is already present")
        }

        const newCategory = await Category.create({ categoryName, restaurantId: req.restaurantId })

        return showResponse(res, newCategory, "Category added successfully")

    } catch (error) {
        return showServerError(res)
    }
}


const getAllCategory = async (req, res) => {
    try {

        let { pageNumber, pageSize, searchString } = req.body

        const { error } = paginationValidation.validate({ pageNumber, pageSize })

        if (error) {
            return showError(res, error.details[0].message)
        }

        const con = {
            status: true,
            categoryName: new RegExp(searchString, "i")
        }
        const skipConditions = {
            sort: { createdAt: 1 },
            skip: (pageNumber - 1) * pageNumber,
            limit: pageSize
        }

        const allCategory = await Category.find(con, {}, skipConditions).populate({
            path: "restaurantId",
            select: "restaurantName  name"
        })
        const totalDocuments = await Category.countDocuments(con)

        return showResponse(res, { allCategory, totalDocuments })





    } catch (error) {
        return showServerError(error)
    }
}



module.exports = { createCategory, getAllCategory }