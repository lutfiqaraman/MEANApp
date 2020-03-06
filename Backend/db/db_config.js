/*
    A database connection file
    The database is mongodb ver. 4.2
*/
const mongoose = require("mongoose");

const server = process.env.SERVER;
const databaseName = process.env.DATABASENAME;

mongoose.connect(
  `mongodb://${server}/${databaseName}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  err => {
    if (err) throw err;
  }
);
