require('dotenv').config();
const jwt = require('jsonwebtoken');
const blogUser = require('../model/userModel');
const { Message } = require('../commonFunction/commonfunction');

function register(req, res) {
  res.render('register', { email: req.email });
}

function login(req, res) {
  res.render('login', { email: req.email });
}

async function addUser(req, res) {
  const createUser = await blogUser.find({ userName: req.body.userName })
  if (createUser.length != 1) {
    let addUser = new blogUser(req.body);
    try {
      await addUser.save();
      res.redirect('/user/login');
    } catch (err) {
      res.send(err);
    }
  } else {
    res.redirect('/user/login');
  }
}

async function authenticate(req, res) {
  try {
    const user = await blogUser.findOne({ userName: req.body.userName, password: req.body.password }, { password: 0 });
    if (user !== null) {
      jwt.sign({ user }, process.env.SECRET_KEY, function (err, token) {
        if (token) {
          cookiesVerify(req, res, token);
        }
      });
    } else {
      res.json(Message(400, "false", 'OK', 'User Not Found'));
    }
  } catch (err) {
    res.json(Message(400, "false", 'Bad Request', ''));
  }
}

function logout(req, res) {
  res.clearCookie('token').redirect('/user/login');
}

function cookiesVerify(req, res, token) {
  if (req.cookies.token === undefined) {
    res.cookie('token', token, { maxAge: 100000, httpOnly: true }).redirect('/post/user');
  } else {
    res.send(400).json({
      Message: 'You are already logged in'
    })
  }
}

module.exports = { addUser, authenticate, login, register, logout, cookiesVerify };