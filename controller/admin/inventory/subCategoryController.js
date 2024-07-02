const { showServerError, showError, showResponse, checkRequestType } = require("../../../common-modules.js/helper")
const SubCategory = require("../../../model/admin/inventory/subCategoryModal")
const { editCategoryValidation } = require("../../../utils/adminValidation")
const { paginationValidation } = require("../../../utils/restaurantValidation")



const adminEditSubCategory = async (req, res) => {
    try {
        // let { id, categoryName, restaurantId, status } = req.body

        // const requestType = checkRequestType(req)

        // if (requestType == "inventory") {
        //     status = false
        // }

        // console.log("id", requestType, id, categoryName, restaurantId, status);



        // const { error } = editCategoryValidation.validate({ id, categoryName, restaurantId, status })
        // if (error) {
        //     return showError(res, error.details[0]?.message)
        // }

        // const updatedCategory = await Category.findByIdAndUpdate(
        //     { _id: id },
        //     { categoryName, restaurantId, status },
        //     { new: true }
        // )

        // let msg = "Category has been updated"
        // if (requestType == "inventory") {
        //     msg = "Category has been sent for the admin approval"
        // }

        // return showResponse(res, updatedCategory, msg)

    } catch (error) {
        showServerError(res)
    }
}


const adminGetAllSubCategory = async (req, res) => {
    try {

        // const { pageNumber, pageSize, searchString } = req.body

        // const { error } = paginationValidation.validate({ pageNumber, pageSize })

        // if (error) {
        //     return showError(res, error.details[0].message)
        // }

        // let con = {}

        // //checking the request path (pending invertory or inventory)
        // let requestType = checkRequestType(req)
        // if (requestType == "pending-inventory") {
        //     con.status = false
        // } else {
        //     con.status = true
        // }

        // if (searchString) {
        //     con.categoryName = new RegExp(searchString, "i")
        // }

        // const skipCon = {
        //     createdAt: { sort: -1 },
        //     skip: (pageNumber - 1) * pageSize,
        //     limit: pageSize
        // }


        // const allCateogry = await Category.find(con, {}, skipCon)
        // const totalCount = await Category.countDocuments(con)
        // return showResponse(res, { data: allCateogry, totalCount })

    } catch (error) {
        showServerError(res)
    }
}

const adminGetSingleSubCategory = async (req, res) => {
    try {
        // const { id } = req.params

        // const requestType = checkRequestType(req)

        // console.log("requestType", requestType);

        // let con = { _id: id }
        // if (requestType == "pending-inventory") {
        //     con.status = false
        // } else {
        //     con.status = true
        // }
        // console.log(con);


        // const cateogry = await Category.findOne(con)

        // if (!cateogry) {
        //     return showError(res, "No category found")
        // }
        // return showResponse(res, cateogry)


    } catch (error) {
        showServerError(res)
    }
}


module.exports = { adminEditSubCategory, adminGetAllSubCategory, adminGetSingleSubCategory }