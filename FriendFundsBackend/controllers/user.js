const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

//creating a new user
exports.addUser = (req, res, next) => {
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
          message: "User created successfully!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Invalid authentication credentials!",
        });
      });
  });
};

//user login
exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Invalid authentication credentials!",
      });
    });
};
