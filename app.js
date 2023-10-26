const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./utils/config");
const bookingsRouter = require("./controllers/bookings");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGO_URI)
  .then(() => logger.info("connected to MongoDB"))
  .catch((error) => logger.error("error connecting to MongoDB", error.message));

app.use(express.json());

app.use("/api/bookings", bookingsRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;
