//mongoose schema

const mongoose = require("mongoose");
//use a unique validator for e-mails
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
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

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
