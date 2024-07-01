const { showServerError, showError, showResponse, checkRequestType } = require("../../../common-modules.js/helper")
const Category = require("../../../model/admin/inventory/categoryModel")
const { editCategoryValidation } = require("../../../utils/adminValidation")
const { paginationValidation } = require("../../../utils/restaurantValidation")



const adminEditCategory = async (req, res) => {
    try {
        const { id, categoryName, restaurantId, status = false } = req.body
        const requestType = checkRequestType({ id, categoryName, restaurantId, status })

        console.log("id", id, categoryName, restaurantId, status);



        const { error } = editCategoryValidation.validate({ id, categoryName, restaurantId, status })
        if (error) {
            return showError(res, error.details[0]?.message)
        }
        res.send("saved")
    } catch (error) {
        showServerError(res)
    }
}


const adminGetAllCategory = async (req, res) => {
    try {

        const { pageNumber, pageSize, searchString } = req.body

        const { error } = paginationValidation.validate({ pageNumber, pageSize })

        if (error) {
            return showError(res, error.details[0].message)
        }

        let con = {}

        //checking the request path (pending invertory or inventory)
        let requestType = checkRequestType(req)
        if (requestType == "pending-inventory") {
            con.status = false
        } else {
            con.status = true
        }

        if (searchString) {
            con.categoryName = new RegExp(searchString, "i")
        }

        const skipCon = {
            createdAt: { sort: -1 },
            skip: (pageNumber - 1) * pageSize,
            limit: pageSize
        }


        const allCateogry = await Category.find(con, {}, skipCon)
        const totalCount = await Category.countDocuments(con)
        return showResponse(res, { data: allCateogry, totalCount })

    } catch (error) {
        showServerError(res)
    }
}

const adminGetSingleCategory = async (req, res) => {
    try {
        const { id } = req.params

        const requestType = checkRequestType(req)

        console.log("requestType", requestType);

        let con = { _id: id }
        if (requestType == "pending-inventory") {
            con.status = false
        } else {
            con.status = true
        }
        console.log(con);


        const cateogry = await Category.findOne(con)

        if (!cateogry) {
            return showError(res, "No category found")
        }
        return showResponse(res, cateogry)


    } catch (error) {
        showServerError(res)
    }
}


module.exports = { adminEditCategory, adminGetAllCategory, adminGetSingleCategory }