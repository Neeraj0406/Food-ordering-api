const { showServerError, showResponse, showError } = require("../../../common-modules.js/helper")
const Product = require("../../../model/admin/inventory/productModel")
const FoodType = require("../../../model/admin/master/foodType/foodType")
const Category = require("../../../model/admin/inventory/categoryModel")
const SubCategory = require("../../../model/admin/inventory/subCategoryModal")
const Restaurant = require("../../../model/admin/user/restaurant/restaurantModal")


const createProduct = async (req, res) => {
    try {
        const { productName, foodType, category, subCategory, allAddons, price, description, vegType, tags } = req.body
        // console.log("data", productName, foodType, category, subCategory, allAddons, price, description, vegType, tags);

        const productNameFound = await Product.findOne({ productName: new RegExp(`^${productName}$`, "i"), restaurantId: req.restaurantId })

        if (productNameFound) {
            return showError(res, "Product name is already present")
        }

        const newProduct = await Product.create({ productName, restaurantId: req.restaurantId, foodType, category, subCategory, allAddons, price, description, vegType, tags })

        return showResponse(res, newProduct, "New product added successfully")



    } catch (error) {
        console.log("error", error);

        showServerError(res)
    }
}

const getAllProduct = async (req, res) => {
    try {
        let { pageNumber, pageSize, searchString, type, recommended } = req.body
        pageNumber = Number(pageNumber)
        pageSize = Number(pageSize)

        const regex = new RegExp(searchString, "i")

        const aggregationPipeline = [
            { $match: { status: true } },
            { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: "restaurants",
                    localField: "restaurantId",
                    foreignField: "_id",
                    as: "restaurantDetails"
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            { $unwind: "$restaurantDetails" },
            { $unwind: "$categoryDetails" },

            {
                $match: {
                    $or: [
                        { productName: regex },
                        { "restaurantDetails.restaurantName": regex },
                        { "categoryDetails.categoryName": regex },
                    ]
                }
            },
        ]
        if (type) {
            aggregationPipeline.push({
                $match: {
                    vegType: type
                }
            })
        }
        if (recommended) {
            aggregationPipeline.push({
                $match: {
                    "tags.recommended": recommended
                }
            },)
        }
        const secondAggregation = [...aggregationPipeline]
        secondAggregation.push({
            $group: {
                "_id": "$restaurantId",
                "count": { "$sum": 1 }
            }


        })

        aggregationPipeline.push(
            { $skip: (pageNumber - 1) * pageSize },
            { $limit: pageSize }
        )



        const allProducts = await Product.aggregate(aggregationPipeline)
        const countProduct = await Product.aggregate(secondAggregation)

        return showResponse(res, { allProducts, totalDocument: countProduct[0]?.count })




        // return showResponse(res, allProduct)

    } catch (error) {
        console.log(error);

        showServerError(res)
    }
}


module.exports = { createProduct, getAllProduct }