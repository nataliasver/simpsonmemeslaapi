const _ = require("lodash")
const jwt = require("jsonwebtoken");
require("dotenv").config();


const verifyToken = (req, res, next) => {
    const authHeader = _.get(req, "headers['authorization']")
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader && _.split(authHeader,' ')[1];
    if(!token) return res.sendStatus(401);
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        console.log(err)
        if(err) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    })
}

module.exports = { verifyToken }