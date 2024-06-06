const express = require('express');
const router = express.Router();
const VerifyToken = require("../middleware/Auth");
const Photo = require("../db/photoModel");
const multer = require("multer")

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, "./public/image")
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)

const upload = multer({storage: storage})

router.post("/image", VerifyToken, upload.single("image"), async (req, res) => {
    const photo = new Photo({
        user_id: req.user._id,
        file_name: req.file.filename,
        comments: []
    })
    // console.log(photo,"da luu");
    await photo.save();
    res.status(200).send("Image upload successfully")
})

module.exports = router
