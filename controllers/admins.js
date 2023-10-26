const Admin = require("../models/admin");
const bcryt = require("bcrypt");
const adminsRouter = require("express").Router();
const { adminExtractor } = require("../utils/middleware");

adminsRouter.get("/", adminExtractor, async (request, response) => {
  const admins = await Admin.find({});
  response.json(admins);
});

// adminsRouter.post("/", async (request, response) => {
//   const { username, password } = request.body;

//   if (!username || !password) {
//     return response
//       .status(400)
//       .json({ error: "username or password is empty" });
//   }

//   if (password.length < 5) {
//     return response
//       .status(400)
//       .json({ error: "Password must be at least 5 characters." });
//   }

//   if (username.length < 3) {
//     return response
//       .status(400)
//       .json({ error: "Username must be at least 3 characters." });
//   }

//   const saltRounds = 10;
//   const passwordHash = await bcryt.hash(password, saltRounds);

//   const admin = new Admin({
//     username,
//     passwordHash,
//   });

//   const savedAdmin = await admin.save();

//   response.status(201).json(savedAdmin);
// });

module.exports = adminsRouter;
