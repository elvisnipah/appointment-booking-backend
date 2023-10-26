const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./utils/config");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) =>
    console.error("error connecting to MongoDB", error.message)
  );

module.exports = app;
