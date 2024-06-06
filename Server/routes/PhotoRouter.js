const express = require("express");
const Photo = require("../db/photoModel");
const mongoose = require("mongoose");
const router = express.Router();
const veriryToken = require("../middleware/Auth.js");

router.post("/:photoId",veriryToken , async (request, response) => {
  try {
    // console.log(request.body.reaction,"react1");
    const photo = await Photo.findById(request.params.photoId).lean();
    if (!photo) {
      return response.status(400).send({
        message: "Photo id is not valid.", success: false
      });
    }
   
    if(!photo.reactions){
      photo.reactions = [];
    }

    // ktra thả reaction chưa
    const reaction = photo.reactions.find((r)=>{
      return r.user_id.equals(request.user._id);
    })

    //xoa reactions cũ
    if(reaction){
      photo.reactions = photo.reactions.filter((r)=>{
        return !r.user_id.equals(request.user._id);
      })
    }
    // console.log(request.body.reaction,"react2");
    if(request.body.reaction >= 0){
    photo.reactions.push({user_id: request.user._id, reaction: request.body.reaction});
    }
    await Photo.findByIdAndUpdate(request.params.photoId, photo);
    response.status(200).send({message: "No error", success: true, photo: photo});
    console.log(photo,"du lieu anh");
  } catch (error) {
    console.error(error);
  }
});

router.get("/:userId", veriryToken, async (request, response) => {
  try {
    const id = request.params.userId;
    const photos = await Photo.find({ user_id: id }).populate({
      path: "comments.user_id",
      model: "Users"
    });
    // console.log(photos);
    return response.send(photos);
  } catch (error) {
    return response.status(500).send({ error });
  }
});

module.exports = router;
