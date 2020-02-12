const express = require("express");
const router = express.Router();

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

//controller
const userController  = require('../../controller/userController')

module.exports = router;

