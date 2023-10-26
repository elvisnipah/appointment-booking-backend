const bookingsRouter = require("express").Router();
const Booking = require("../models/booking");
const { adminExtractor } = require("../utils/middleware");

bookingsRouter.get("/", adminExtractor, async (request, response) => {
  const result = await Booking.find({});
  response.json(result);
});

bookingsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;

  const result = await Booking.findById(id);
  if (result) {
    return response.json(result);
  }
  response.status(404).end();
});

bookingsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.phoneNumber ||
    !body.appointmentTime
  ) {
    return response.status(400).send({
      error: "missing value",
    });
  }

  const booking = new Booking({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phoneNumber: body.phoneNumber,
    appointmentTime: body.appointmentTime,
  });

  const savedBooking = await booking.save();

  response.status(201).json(savedBooking);
});

module.exports = bookingsRouter;
