const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

require('dotenv').config({ path: './config/.env' })

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const users = require("./routes/users.routes")(app);

//Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log("Server started on port " + port);
});

module.exports = app;