const jwt = require("jsonwebtoken");
require('dotenv').config();

const blogUser = require('../model/userModel');
const { Message } = require('../commonFunction/commonfunction');

//register page render
function register(req, res) {
  res.render('register', { email: req.userName });
}

// login Page render
function getlogin(req, res) {
  res.render('login', { email: req.userName });
}

//register User
async function addUser(req, res) {
  let addUser = new blogUser(req.body);  
  try {
    await addUser.save();
    res.redirect('/user/login');
  } catch (err) {
    res.send(err);
  }
}

//for verifying Cookie
function cookiesVerify(req, res, token) {
  if (req.cookies.token === undefined) {
    res.cookie('token', token, { maxAge: 900000, httpOnly: true }).redirect('/post/user');
  } else {
    res.json(Message(400, 'false', 'You are already logged in', ''));
  }
}

//authenticate user
async function authenticate(req, res) {
  try {
    const user = await blogUser.findOne(
      { userName: req.body.userName, password: req.body.password },
      { password: 0 }
    );
    if (user) {
      jwt.sign({ user }, process.env.SECRET_KEY, function(err, token) {
        if (token) {
          cookiesVerify(req, res, token);
        }
      });
    } else {
      res.json(Message(400, 'falseee', 'OK', 'User Not Found'));
    }
  } catch (err) {
    res.json(Message(400, 'false', 'Bad Request', ''));
  }
}

// logout function nd clear cookie 
function logout(req, res) {
  res.clearCookie('token').redirect('/user/login');
}

module.exports = {
  addUser,
  authenticate,
  getlogin,
  register,
  logout,
  cookiesVerify
};
