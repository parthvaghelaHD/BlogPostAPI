const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const blogUser = require('../../model/user');

router.post("/", async (req, res) => {
  let createUser;
  try {
    createUser = new blogUser(req.body);
    await createUser.save();
  } catch (err) {
    res.status(400).json({
      message: "error"
    });
  }
  res.send(createUser);

});

module.exports = router;
