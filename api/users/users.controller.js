const Users = require("./users.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Promise = require("bluebird");
const {getUserSingIn} = require("../utils/userSignInJwt");
const UserService = new Users();


const getUsers = (req, res, next) => {
        return UserService.findAll()
            .then(users => res.json(users))
            .catch(e => console.log(e))
}

const register = (req, res, next) => {
    const { name, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    return Promise.resolve(bcrypt.genSalt())
        .then(salt => bcrypt.hash(password, salt))
        .then(hashPassword => UserService.create({
            name: name,
            email: email,
            password: hashPassword
        }))
        .then(() => res.json({msg: "Registration Successful"}))
        .catch(e => console.log(e))
}

const login = (req, res, next) => {
    return Promise.resolve(UserService.findOne({ email: req.body.email}))
        .tap(user => console.log(user))
        .then(user => user ? getUserSingIn(req.body.password,user) : Promise.reject())
        .tap(e => console.log(e))
        .then(userSignIn => !userSignIn ? Promise.reject() : userSignIn)
        .tapCatch(e=> console.log("re fallo", e))
        .tap(userSignIn => {
            res.cookie('refreshToken', userSignIn.refreshToken,{
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 })
            res.json({ accessToken: userSignIn.accessToken })
            } )
         .then(userSignIn => UserService.updateRefeshToken(userSignIn.user, userSignIn.refreshToken))
         .catch(e =>  res.status(400).json({msg:"User or password incorrect"}))
}

const logout = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken)
    if(!refreshToken) return res.sendStatus(204);
    return Promise.resolve(UserService.findOneByRefeshToken(refreshToken))
        .then(user => !user ? Promise.reject() : user)
        .tap(user => user.refreshToken = null)
        .then(user => UserService.updateRefeshToken(user))
        .then(() =>  res.clearCookie('refreshToken'))
        .then(() => res.sendStatus(200))
        .catch(e =>  res.sendStatus(400))
}

module.exports = { logout, login, register, getUsers }