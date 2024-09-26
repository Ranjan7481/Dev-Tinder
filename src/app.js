const express = require("express");

const app = express();

const connectDB = require("./config/database");

connectDB()
  .then(() => {
    console.log("database connect succefully");
    app.listen(8080, () => {
      console.log("succefully server started");
    });
  })
  .catch((err) => {
    console.error("database not connected");
  });

