const bookingsRouter = require("express").Router();
const Booking = require("../models/booking");

bookingsRouter.get("/", async (request, response) => {
  const result = await Booking.find({});
  response.json(result);
});

module.exports = bookingsRouter;
