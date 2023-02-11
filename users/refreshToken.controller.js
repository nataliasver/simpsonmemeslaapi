const Users = require("./users.service");
const jwt = require("jsonwebtoken");
const Promise = require("bluebird");
const {getAccessToken, verifyRefreshToken} = require("../utils/userSignInJwt");
const UserService = new Users();


const refreshToken = (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        return Promise.resolve(UserService.findOneByRefeshToken(refreshToken))
            .then(user => user ? verifyRefreshToken(refreshToken, user) : Promise.reject())
            .catch(e => res.sendStatus(403))
            .then(user =>  getAccessToken(user))
            .then(accessToken => res.json({ accessToken }))
}

module.exports = {refreshToken}


