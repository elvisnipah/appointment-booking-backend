const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./utils/config");
const bookingsRouter = require("./controllers/bookings");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) =>
    console.error("error connecting to MongoDB", error.message)
  );

app.use("/api/bookings", bookingsRouter);

module.exports = app;
