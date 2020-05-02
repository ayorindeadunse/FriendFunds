//express app

const express = require('express');

const app = express();
const debug = require("debug")("friendfunds");


app.use('/api/users',(req,res,next) => {
  const users = [
    {
      id: "adfad",
      firstname: "Ayorinde",
      lastname: "Adunse"
    },
    {
      id: "esees",
      firstname: "Ejiro",
      lastname: "Ogidigben"
    }
  ];
    res.status(200).json({
      message: 'List of all users.',
      users: users
    });
  });

module.exports = app;
