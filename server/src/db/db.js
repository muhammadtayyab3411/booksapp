const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/books")
  .then(() => {
    console.log("connection to db successfull");
  })
  .catch((err) => console.log(err));
