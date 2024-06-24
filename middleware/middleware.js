const { token } = require("morgan")
const { verifyToken } = require("../common-modules.js/helper")
const Admin = require("../model/admin/adminModal")

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

const verifyAdminAndMerchant = async (req, res, next) =>{
    
}

module.exports = { verifyAdminToken }