const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

require('dotenv').config({ path: './config/.env' });

//Set Database
require("./db/db_config");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Set a route for Users
const users = require("./routes/users.routes");
app.use("/users", users);

//Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Start Server
app.listen(port, () => {
    console.log("Server started on port " + port);
});