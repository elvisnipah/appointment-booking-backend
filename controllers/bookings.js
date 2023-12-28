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
  const phonePattern = /^0\d{9}$/;
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
  } else if (!phonePattern.test(body.phoneNumber)) {
    return response.status(400).send({
      error: "incorrect phone number",
    });
  }

  const booking = new Booking({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phoneNumber: body.phoneNumber,
    appointmentTime: body.appointmentTime,
    type: body.type,
    comment: body.comment,
    status: "waiting",
  });

  const savedBooking = await booking.save();

  response.status(201).json(savedBooking);
});

bookingsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const id = request.params.id;

  const noteExists = await Booking.findById(id);

  if (!noteExists) {
    // console.log("couldn't find");
    return response.status(404).end();
  }

  const returnedData = await Booking.findByIdAndUpdate(id, body, { new: true });
  response.status(200).json(returnedData);
});

module.exports = bookingsRouter;
