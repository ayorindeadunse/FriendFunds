//express app

const express = require("express");
const bodyParser = require("body-parser");

//add mongoose
const mongoose = require("mongoose");
//get signup routes
const signupRoutes = require("./routes/user");

const app = express();

//connect to the database using mongoose
mongoose
  .connect(
    "mongodb+srv://ayorinde:aKYdsnocRG28VZdT@cluster0-x9wzf.mongodb.net/friendfunds?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected to database!");
  })
  .catch(() => {
    console.log("connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//managing CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  next();
});

//endpoints for friendfunds app
// get all users linked to a specific user

//get all users in a particular location

//get all users
/*app.get("/api/users", (req, res, next) => {
  User.find().then((documents) => {
    res.status(200).json({
      message: "Users fetched successfully!",
      users: documents,
    });
  });
});*/

//patch

//delete

app.use("/api/user", signupRoutes);

module.exports = app;
