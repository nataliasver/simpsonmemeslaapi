const express = require("express")
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require('cors')

require("dotenv").config()



const mongoUri = process.env.MONGO_URI
mongoose.connect(mongoUri)
    .then(()=> console.log("Succesfully connect to mongo"))
    .catch(e => console.log("Could not connect to mongo. Error:",e))

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully to db");
});

const server = express()
server.use(cors())
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }))

server.listen(process.env.PORT || 4000, (err) => {
    err ? console.dir("Server failed...") : console.dir("Server running on port http://localhost:4000")
})

server.use("/api/memes", require("./api/memes/memes.routes"))
server.use("/api/users", require("./api/users/users.routes"))
server.use(express.static(path.resolve(__dirname, "public")));

// server.use(express.static(path.join(__dirname, 'public')))

module.exports = server;
