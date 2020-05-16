//mongoose schema

const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  mobile: { type: Number, required: true },
  dateOfBirth: { type: Date, required: true },
  imagePath: { type: String, required: false },
  dateRegistered: { type: Date, required: true },
});

module.exports = mongoose.model("User", postSchema);
