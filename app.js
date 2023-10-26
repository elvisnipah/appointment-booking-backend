const express = require("express");
require("express-async-errors");
const app = express();
const mongoose = require("mongoose");
const config = require("./utils/config");
const bookingsRouter = require("./controllers/bookings");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const cors = require("cors");
const adminsRouter = require("./controllers/admins");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGO_URI)
  .then(() => logger.info("connected to MongoDB"))
  .catch((error) => logger.error("error connecting to MongoDB", error.message));

// app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.use("/api/bookings", bookingsRouter);
app.use("/api/admins", adminsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
