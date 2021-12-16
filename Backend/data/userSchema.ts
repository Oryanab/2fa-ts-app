const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  passwordHash: String,
  twoFactorAuth: { type: Boolean },
  secret: { type: String },
  qr: { type: String },
});

userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then((result: String) => console.log("Connected to DB"))
  .catch((err: String) => console.error("Cannot Connect to DB"));

export default User;
