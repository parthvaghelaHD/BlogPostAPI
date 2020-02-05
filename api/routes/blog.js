const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const blogPost = require('../../model/posts');

router.post("/", async (req, res) => {
  let createUser;
  try {
    createUser = new blogPost(req.body);
    await createUser.save();
  } catch (err) {
    res.status(400).json({
      message: "error"
    });
  }
  res.send(createUser);
});

module.exports = router;
