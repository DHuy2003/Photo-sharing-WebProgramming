const express = require("express");
const User = require("../db/userModel");
const router = express.Router();
const veriryToken = require("../middleware/Auth.js");

router.get("/list", veriryToken,  async (request, response) => {
  try {
    const users = await User.find({});
    response.status(200).json({data: users});
  } catch (error) {
    response.status(500).json({msg : error.message});
  }
  
});

router.get("/accesstoken", veriryToken,  async (request, response) => {
  response.status(200).send(request.user);
});

router.get("/:userId", veriryToken, async (request, response) => {
  const id = request.params.userId;
  const user = await User.findOne({_id : id});
  if (!user) {
    return response.status(400).send({
      message: "User id is not valid.",
    });
  }
  return response.status(200).send(user);
});



module.exports = router;
