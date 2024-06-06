const express = require("express");
const router = express.Router();
const Photo = require("../db/photoModel");
const VerifyToken = require("../middleware/Auth");

router.post("/:id", VerifyToken, async (req, res) => {
    try {
        const checkPhoto = await Photo.findOne({_id: req.params.id})
        if(!checkPhoto){
         res.status(400).json({msg: "Photo not found", success: false});
        }
        else{
           checkPhoto.comments.push({
            user_id: req.user._id,
            comment: req.body.comment
           })
           await checkPhoto.save();
           const photo = await Photo.findOne({_id: req.params.id}).populate({
            path: "comments.user_id",
            model: "Users",
           })
           res.status(200).json({data: photo, success: true});
        }
       } 
       catch (error) {
        console.log(error);
        res.status(400).json({msg: "Failed", success: false});
       }
});


module.exports = router;