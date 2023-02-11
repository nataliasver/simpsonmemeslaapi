const router = require("express").Router()
const { getAllMemes, uploadMemes, getMemesById, getMemesByTitle, getMemesBySeason, getMemesByEpisode, getMemesByCharacter, deleteById, updateMeme } = require("./memes.controller")
const multer  = require('multer')
const {verifyToken} = require("../middleware/VerifyToken");
const cloudinary = require('cloudinary').v2
require("dotenv").config()

const storage = multer.memoryStorage()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ storage: storage })

router.get("/memes", getAllMemes)
router.get("/id", getMemesById)
router.get("/title", getMemesByTitle)
router.get("/season", getMemesBySeason)
router.get("/episode", getMemesByEpisode)
router.get("/character", getMemesByCharacter)

router.delete("/id", verifyToken, deleteById)
router.post("/upload/meme", verifyToken,upload.single('file'), uploadMemes);
router.put("/update/meme", verifyToken,upload.single('file'), updateMeme)

module.exports = router