const { showServerError, showResponse, showError } = require("../../../common-modules.js/helper")
const Product = require("../../../model/admin/inventory/productModel")


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
        const { pageNumber, pageSize, searchString } = req.body

        let con = { status: true }
        console.log("searchString", searchString);

        if (searchString) {
            const regex = new RegExp(searchString, "i")

            con["$or"] = [
                { productName: regex },
                // { price: regex },
                // { foodType: regex },
                // { category: regex }
            ]
        }

        const skipCondition = {
            skip: (pageNumber - 1) * pageSize,
            limit: pageSize
        }

        // const allProduct = await Product.find(con, {}, skipCondition).populate(
        //     ["category", "foodType", "allAddons.addonCategory", "allAddons.addon"]
        // )

        const allProduct = await Product.aggregate([
            {
                $lookup: {
                    from: 'addoncategories', // Collection name for AddonCategory
                    localField: 'allAddons.addonCategory',
                    foreignField: '_id',
                    as: 'addonCategory'
                }
            }
        ])

        return showResponse(res, allProduct)

    } catch (error) {
        showServerError(res)
    }
}


module.exports = { createProduct, getAllProduct }