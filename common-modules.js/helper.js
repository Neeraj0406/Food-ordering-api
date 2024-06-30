const msg = require("./errorMessage")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const path = require("path")
const appRootPath = require("app-root-path")

const showServerError = (res, msg) => {
    return res.status(500).json({ message: msg ? msg.serverError : "Server Error" })
}

const showData = (res, data) => {
    res.status(200).json({ data: data })
}

const showResponse = (res, data, message) => {
    if (message) {
        res.status(200).json({ data, message })
    } else {
        res.status(200).json({ data })

    }
}

const showMessageOnly = (res, message) => {
    return res.status(200).json({ message: message })
}

const showError = (res, message, statusCode = 400) => {
    return res.status(statusCode).json({
        message: message
    })
}

const checkDataIsPresent = (data, fields, res) => {
    console.log("daata", data)
    if (data) {
        for (let field of fields) {
            console.log("field", field, data[field])
            if (!data[field]) {
                res.status(400).json({
                    message: `${field} is missing`
                })
            }
        }
    }
}


const bcryptPassword = async (password, saltRound = 10) => {
    const salt = await bcrypt.genSaltSync(saltRound)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword

}

const checkPassword = async (password, hashedPassword) => {
    const check = await bcrypt.compare(password, hashedPassword)
    return check
}


const createjwt = async (payload) => {
    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h"
    })
    return token
}


const verifyToken = async (token) => {
    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        return decode

    } catch (error) {
        return false

    }


}


const removeFile = (files, filePath) => {
    if (files?.length) {
        try {

            for (let file of files) {
                fs.unlinkSync(path.join(appRootPath.path, file.path))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const removeSingleFile = (filePath) => {
    fs.unlinkSync(path.join(appRootPath.path, filePath))
}

const deleteSavedFiles = (filePaths) => {
    if (filePaths) {
        for (let filePath of filePaths) {
            fs.unlinkSync(path.join(appRootPath.path, filePath))
        }
    }
}

// this function to test, the request for pending invertory or invertory
const checkRequestType = (req) => {
    const type = req.baseUrl?.split("/")[req.baseUrl?.split("/")?.length - 1]

    if (type == "pending-category") {
        return "pending-inventory"
    } else {
        return "inventory"
    }

}


module.exports = { showServerError, showData, checkDataIsPresent, showResponse, showMessageOnly, bcryptPassword, checkPassword, showError, createjwt, verifyToken, removeFile, removeSingleFile, deleteSavedFiles, checkRequestType }