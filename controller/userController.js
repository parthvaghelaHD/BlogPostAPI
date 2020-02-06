const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const blogUser = require("../model/user");

async function addUser(req, res) {
  let createUser;
  //try {
    createUser = new blogUser(req.body);
    await createUser.save();
    res.send(createUser)

  //} catch (err) {
    res.status(400).json({
      message: "error"
    });
  //}
}

async function login(req, res) {  
  try {
    const user = await blogUser.findOne({ email: req.body.email });
    jwt.sign({ user }, process.env.SECRET_KEY, function(err, token) {
      res.status(200).json({ token });
    });
  } catch (e) {
    res.status(400).json({
      message: e
    });
  }
}



module.exports = { addUser, login };
