const jwt = require("jsonwebtoken")

const VeriryToken = (req, res, next) => {
    const auther = req.header("Authorization");
    const token = auther && auther.split(" ")[1];
    if(!token)
        res.status(401).json("Unauthenticated");
    else{
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decode) => {
            if(err)
                res.status(401).json("Unauthenticated");
            else{
                req.user = decode.user;
                next();
            }
        });
    }
}
module.exports = VeriryToken;