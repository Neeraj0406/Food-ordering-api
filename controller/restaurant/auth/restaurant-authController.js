const { showError, bcryptPassword, showResponse, showServerError, checkPassword, createjwt, showData } = require("../../../common-modules.js/helper")
const Restaurant = require("../../../model/admin/user/restaurant/restaurantModal")
const Joi = require("joi")
const { createRestaurantValidation, loginValidationSchema } = require("../../../utils/restaurantValidation")

const createRestaurant = async (req, res) => {
    try {

        const restaurantData = req.body

        const { error } = createRestaurantValidation.validate(restaurantData)

        if (error) {
            return showError(res, error.details[0].message)
        }

        const { name, restaurantName, address1, email, mobileNumber, password, accectTerms } = restaurantData
        const restaurantNamePresent = await Restaurant.findOne({ restaurantName: new RegExp(`^${restaurantName}$`, "i") })

        if (restaurantNamePresent) {
            return showError(res, "Restaurant already present")
        }

        const emailPresent = await Restaurant.findOne({ email })

        if (emailPresent) {
            return showError(res, "Email is already present")
        }

        const hashedPassword = await bcryptPassword(password)

        const newRestaurant = await Restaurant.create({
            name, restaurantName, address1, email, mobileNumber, password: hashedPassword
        })


        return showResponse(res, newRestaurant, "Restaurant has been created. Your request will be approved in 2-3 working days")


    } catch (error) {
        showError(res, error.message)
    }
}


const loginRestaurant = async (req, res) => {
    try {
        let loginData = req.body

        const { error } = loginValidationSchema.validate(loginData)

        if (error) {
            return showError(res, error.details[0].message)
        }

        let restaurantFound = await Restaurant.findOne({ email: loginData.email }).lean()

        if (!restaurantFound) {
            return showError(res, "Invalid Credentials")
        }



        const verifyPassword = await checkPassword(loginData.password, restaurantFound.password)
        if (!verifyPassword) {
            return showError(res, "Invalid Credentials")
        }


        if (!restaurantFound?.status) {
            return showError(res, "Your account is not verified yet.")
        }

        const token = await createjwt({ "id": restaurantFound._id, "role": 2 })

        restaurantFound.token = token
        delete restaurantFound.password


        return showResponse(res, restaurantFound, "login successful")





    } catch (error) {
        console.log(error)
        showServerError(res)
    }
}


module.exports = { createRestaurant, loginRestaurant }
