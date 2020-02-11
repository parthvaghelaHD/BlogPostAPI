const express = require("express");
const router = express.Router();

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
// const { verifyToken } = require('../../middelware/middelware')


//model 
// const blogUser = require('../../model/user');
// const blogPost = require('../model/posts')


//controller
const userController  = require('../../controller/userController')

router.post('/login', function( req, res ) {
  userController.loginView
});

router.post('/user', function(req, res) {
  userController.addUser
} );


module.exports = router;

