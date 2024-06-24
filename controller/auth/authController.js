const { checkDataIsPresent, showMessageOnly, showServerError, bcryptPassword, checkPassword, showError, createjwt, showData } = require("../../common-modules.js/helper")
const Admin = require("../../model/admin/adminModal")
const jwt = require("jsonwebtoken")

const createAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        const hashedPassword = await bcryptPassword(password)
        console.log("hashedPassword", hashedPassword)
        await Admin.create({ email, password: hashedPassword })
        return showMessageOnly(res, "Admin added successfully")
    } catch (error) {
        console.log(error);

        showServerError(res)
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let requiredFields = ["email", "password"]
        // checkDataIsPresent(req.body, requiredFields, res)

        const admin = await Admin.findOne({ email })

        if (!admin) {
            return showError("Invalid credentials")
        }
        const validatePassword = await checkPassword(password, admin.password)

        if (validatePassword) {
            const jwtPayload = {
                "id": admin?._id,
                "role": "3"
            }
            const token = await createjwt(jwtPayload)
            admin.token = token

            return showData(res, {
                token: token
            })

        } else {
            return showError("Invalid credentials")
        }


    } catch (error) {

    }
}

module.exports = { createAdmin, login }