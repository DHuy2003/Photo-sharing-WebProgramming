const express = require("express"); // Yêu cầu và sử dụng thư viện Express để tạo và quản lý máy chủ web
const User = require("../db/userModel"); // Yêu cầu và sử dụng mô hình người dùng từ một file khác
const router = express.Router(); // Sử dụng Router của Express để tạo một bộ định tuyến mới
const jwt = require("jsonwebtoken")

router.post("/login", async (request, response) => { 
    const {username, password} = request.body;
    // console.log(username, password);
    if(!username || !password) {
        response.status(400).json({msg : "Please enter full of fields", ok: false});
    }
    const user = await User.findOne({username});
    if(!user) {
        response.status(400).json({msg : "Invalid username or password", ok: false});
    }
    else {
        if(user.password !== password) {
            response.status(400).json({msg : "Invalid username or password", ok: false});
        }
        else{
            jwt.sign(
                {user},
                process.env.ACCESS_TOKEN_KEY,
                (err, token) => {
                    if(err){
                        response.status(500).json({msg: "Error signing token", ok: false});
                    }
                    else{
                         response.status(200).json({msg : "Login successfully", ok: true, token, user});
                    }
                }
            )
        }
    }
})

router.post("/register", async (request, response) => { 
    const {username, password, first_name , last_name, location, description, occupation} = request.body;
    console.log(request.body);
    if(!username || !password || !first_name) {
        response.status(400).json({msg : "Please enter full your first_name, username and password", ok : false});
    }
    const user = await User.findOne({username});
    if(user) {
        response.status(400).json({msg: "User already exists", ok : false});
    }
    else {
        const newUser = new User({
            first_name,
            last_name,
            location,
            description,
            occupation,
            username,
            password
        });
        await newUser.save();
        jwt.sign(
            {user : newUser},
            process.env.ACCESS_TOKEN_KEY,
            (err, token) => {
                if(err){
                    response.status(500).json({msg : "Error signing token", ok : false});
                }
                else{
                     response.status(200).json({msg : "Register successfully", token, ok : true});
                }
            }
        )
   }
})

module.exports = router;