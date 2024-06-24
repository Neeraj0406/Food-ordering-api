const path = require("path")
const multer = require('multer')
const fs = require("fs");
const appRootPath = require("app-root-path");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        let foldername = req.body.imagePath;
        console.log("inside multer")
        console.log({ foldername });

        if (typeof foldername !== 'string' || foldername.trim() === '') {
            foldername = 'default';
        }

        const uploadPath = `/public/upload/${foldername}`
        const dir = path.join(appRootPath.path, uploadPath)
        console.log("appRootPath.path", appRootPath.path);

        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                console.error("Error creating directory:", err);
                return cb(err);
            }
            cb(null, "./public/upload/" + req.body.imagePath);
        });
    },

    filename(req, file, cb) {
        cb(null, + Date.now() + '-' + file.originalname);
    }
});


const multerFilter = (req, file, cb) => {
    req.error = null
    console.log("inside multer filter")
    if (req.body.imagePath) {
        if (file.mimetype.split("/")[1] == "png" || file.mimetype.split("/")[1] == "jpg" || file.mimetype.split("/")[1] == "jpeg" || file.mimetype.split("/")[1] == "pdf") {
            return cb(null, true)
        } else {
            req.error = "Only jpg, jpeg, png, pdf file are accepted"
            return cb(null, false)
        }
    } else {
        req.error = "Please add image path"
        return cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: multerFilter });

module.exports = upload;