const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    appointmentTime: Date,
  },
  {
    timestamps: true,
  }
);

bookingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id.toString()),
      delete returnedObject._id,
      delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
