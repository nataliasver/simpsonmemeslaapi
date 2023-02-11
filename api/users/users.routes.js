const { verifyToken } = require("../middleware/VerifyToken.js");
const { refreshToken } = require("./refreshToken.controller");
const router = require("express").Router()
const { login, logout, register } = require("./users.controller")


router.get('/users', verifyToken);
router.get('/token', refreshToken);
router.post("/login", login)
router.delete("/logout", logout)
router.post("/register", register)

module.exports = router