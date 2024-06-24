const { token } = require("morgan")
const { verifyToken, showError } = require("../common-modules.js/helper")
const Admin = require("../model/admin/adminModal")
const Restaurant = require("../model/admin/user/restaurant/restaurantModal")

const verifyAdminToken = async (req, res, next) => {
    try {
        const token = req.headers.token?.split(" ")[1]

        if (token) {

            const decode = await verifyToken(token)

            if (decode.id) {
                const admin = Admin.findById(decode.id)
                if (admin) {
                    next()
                } else {
                    return res.status(401).json({ message: "Invalid token" })
                }
            } else {
                return res.status(401).json({ message: "Invalid token" })
            }


        }
        else {
            return res.status(400).json({
                message: "No token provided"
            })
        }


    } catch (error) {

    }
}

const verifyRestaurantToken = async (req, res, next) => {
    try {
        const token = req.headers.token?.split(" ")[1]

        if (token) {
            const decode = await verifyToken(token)

            if (decode.id) {
                req.restaurantId = decode.id
                const restaurantDetials = await Restaurant.findById(req.restaurantId)
                if (!restaurantDetials.status) {
                    return res.status(401).json({
                        message: "Your account has been blocked by admin"
                    })
                }

                next()
            } else {
                return res.status(401).json({
                    message: "Token is expired"
                })
            }
        } else {
            return res.status(401).json({
                message: "No token provided"
            })
        }
    } catch (error) {

    }

}

module.exports = { verifyAdminToken, verifyRestaurantToken }