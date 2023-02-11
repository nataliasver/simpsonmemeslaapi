const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Promise = require("bluebird");
require("dotenv").config();

const getUserSingIn = (password,user) => {
   return bcrypt.compare(password, user.password)
       .then(match =>{
           if (!match) return Promise.reject();
           const userForSign = {
               _id: user._id.toString(),
               name: user.name,
               email: user.email
           }
           console.log(process.env.ACCESS_TOKEN_SECRET)
           console.log(process.env.REFRESH_TOKEN_SECRET)
           const accessToken = jwt.sign(userForSign, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1h' } );
           const refreshToken = jwt.sign(userForSign, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '1d' });
           return Promise.resolve({user, accessToken, refreshToken})
       } )

}

const getAccessToken = ({ _id, name, email}) => {
    return jwt.sign({ _id: _id.toString(), name, email}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '15s'
    });
}

const verifyRefreshToken = (refreshToken, user) => {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err) return Promise.reject(err);
        console.log(user)
        return Promise.resolve(user)
    })
}

module.exports = { verifyRefreshToken, getAccessToken, getUserSingIn }