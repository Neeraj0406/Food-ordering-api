const { showMessageOnly, removeFile, removeSingleFile, deleteSavedFiles, showServerError } = require("../../../../common-modules.js/helper");
const Restaurant = require("../../../../model/admin/user/restaurant/restaurantModal");
const { search } = require("../../../../routes/adminRoutes");

const addRestaurant = async (req, res) => {
    try {
        const { coverPhoto, aadharPhoto, panPhoto, foodLicensePhoto, cancelChequePhoto } = req.files
        if (req.files && (!coverPhoto || !aadharPhoto || !panPhoto || !foodLicensePhoto || !cancelChequePhoto)) {
            showMessageOnly(res, "Please upload images")
        }

        const { restaurantName, email, mobileNumber, address1, address2, country, state, city, pinCode, fassaiNumber, password } = req.body

        let restaurantPresent = await Restaurant.findOne({ restaurantName: new RegExp(`^${restaurantName}$`, "i") },
        )

        console.log({ restaurantPresent })

        if (restaurantPresent) {

            removeFile(coverPhoto)
            removeFile(aadharPhoto)
            removeFile(panPhoto)
            removeFile(foodLicensePhoto)
            removeFile(cancelChequePhoto)


            showMessageOnly(res, "Restaurant name is already present")


        }
        else {
            let coverPhotoPath = coverPhoto[0]?.path
            let aadharPhotoPath = aadharPhoto?.map((file) => file?.path)
            let panPhotoPath = panPhoto?.map((file) => file?.path)
            let foodLicensePhotoPath = foodLicensePhoto?.map((file) => file?.path)
            let cancelChequePhotoPath = cancelChequePhoto[0]?.path


            const newRestaurant = await Restaurant.create(
                { restaurantName, email, mobileNumber, address1, address2, country, state, city, pinCode, fassaiNumber, password, coverPhoto: coverPhotoPath, aadharPhoto: aadharPhotoPath, panPhoto: panPhotoPath, foodLicensePhoto: foodLicensePhotoPath, cancelChequePhoto: cancelChequePhotoPath })


            return res.status(201).json({
                data: newRestaurant,
                message: "Restaurant added successfully"
            })
        }

    } catch (error) {
        console.log(error);

    }
}


const editRestaurant = async (req, res) => {
    try {
        if (req.error) {
            res.status(400).json({ message: req.error })
        }
        console.log("inside");

        console.log("req.files", req.files)

        const { id } = req.params
        const { restaurantName, email, mobileNumber, address1, address2, country, state, city, pinCode, fassaiNumber, password, deletedAadharPhoto, deletedPanPhoto, deletedFoodLicensePhoto } = req.body
        const { coverPhoto, aadharPhoto, panPhoto, foodLicensePhoto, cancelChequePhoto } = req.files

        const restaurantDetails = await Restaurant.findById(id)

        if (!restaurantDetails) {
            return showMessageOnly(res, "Restaurant not found")
        }

        const restaurantNameFound = await Restaurant.findOne(
            {
                restaurantName: new RegExp(`^${restaurantName}$`),
                _id: { $ne: id }
            },
        )

        if (restaurantNameFound) {
            removeFile(coverPhoto)
            removeFile(aadharPhoto)
            removeFile(panPhoto)
            removeFile(foodLicensePhoto)
            removeFile(cancelChequePhoto)

            showMessageOnly(res, "Restaurant name is already present")
        }
        const updatedData = {
            restaurantName,
            email,
            mobileNumber,
            address1,
            address2,
            country,
            state,
            city,
            pinCode,
            fassaiNumber,
            password,
        }




        if (deletedAadharPhoto?.length) {

            deleteSavedFiles(deletedAadharPhoto)
            updatedData.aadharPhoto = restaurantDetails?.aadharPhoto?.filter((photo) => deletedAadharPhoto?.includes(photo))
        }
        if (deletedPanPhoto?.length) {
            deleteSavedFiles(deletedPanPhoto)
            updatedData.panPhoto = restaurantDetails?.panPhoto?.filter((photo) => deletedPanPhoto?.includes(photo))
        }
        if (deletedFoodLicensePhoto?.length) {
            deleteSavedFiles(deletedFoodLicensePhoto)
            updatedData.foodLicensePhoto = restaurantDetails?.foodLicensePhoto?.filter((photo) => deletedFoodLicensePhoto?.includes(photo))
        }



        if (coverPhoto) {
            updatedData.coverPhoto = coverPhoto[0]?.path
            removeSingleFile(restaurantDetails.coverPhoto)
        }
        if (aadharPhoto) {
            updatedData.aadharPhoto = aadharPhoto[0]?.map((file) => file?.path)
        }
        if (panPhoto) {
            panPhoto?.map((file) => updatedData.panPhoto.push(file?.path))
        }
        if (foodLicensePhoto) {
            foodLicensePhoto?.map((file) => updatedData.foodLicensePhoto.push(file?.path))
        }
        if (cancelChequePhoto) {
            updatedData.cancelChequePhoto = cancelChequePhoto?.path
            removeSingleFile(restaurantDetails.cancelChequePhoto)
        }



        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            { _id: id },
            updatedData,
            { new: true }
        )

        res.status(200).json({
            message: "Restaurant has been updated",
            data: updatedRestaurant
        })





        // const updatedData = 
    } catch (error) {
        console.log(error)
    }
}


const getAllRestaurant = async (req, res) => {
    try {
        const { pageNumber, pageSize, searchString } = req.body

        if (!pageNumber) {
            return showMessageOnly(res, "PageNumber is requried")
        }
        if (!pageSize) {
            return showMessageOnly(res, "Page Size is requried")
        }

        let con = {}

        let skipConditions = {
            sort: { createdAt: -1 },
            skip: ((Number(pageNumber) - 1) * Number(pageNumber)),
            limit: Number(pageSize)
        }
        if (searchString) {
            con["$or"] = [
                { restaurantName: new RegExp(`^${searchString}$`, "i") },
                { email: new RegExp(`^${searchString}$`, "i") },
                { address1: new RegExp(`^${searchString}$`, "i") },
                { mobileNumber: new RegExp(`^${searchString}$`, "i") }
            ]
        }

        const allRestaurant = await Restaurant.find(con, {}, skipConditions)



        res.status(200).json({
            data: allRestaurant
        })


    } catch (error) {
        console.log("error", error)
        showServerError(res)
    }
}


module.exports = { addRestaurant, editRestaurant, getAllRestaurant }