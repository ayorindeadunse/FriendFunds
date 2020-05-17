const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

//Create a new user after signup
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      location: req.body.location,
      email: req.body.email,
      password: hash,
      gender: req.body.gender,
      mobile: req.body.mobile,
      //for the date of birth, parse it into the dd/mm/yy format (perhaps using a function, before saving into database)
      dateOfBirth: req.body.dateOfBirth,
      //set this to null from angular
      imagePath: req.body.imagePath,
      //for the date registered, change it into the dd/mm/yy format after parsing current day*
      dateRegistered: req.body.dateRegistered,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message:
            "You have successfully been created. Please check your e-mail to confirm.",
          //possibly return the id, (check best practices for e-mail confirmation of registration online)
          //userID: createdUser._id,
          //send back the password to the user (best practices for plain text or otherwise)
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

//authentication
router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication Failed!",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Authentication Failed!",
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
        },
        "secret_this_should_be_longer",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Authentication Failed!",
      });
    });
});
module.exports = router;
