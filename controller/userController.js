const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require('bcryptjs')

const blogUser = require("../model/userModel");
const { Message } = require("../commonFunction/commonfunction");

//register page render
function register(req, res) {
  res.render("register", { email: req.userName });
}

// login Page render
function getlogin(req, res) {
  res.render("login", { msg: req.flash("Error"), email: req.userName });
}

//get a home page
function getHome(req, res) {
  res.render("index", { msg: req.flash("Error"), email: req.userName });
}

//get a dashbord page after login
function dashbord(req, res) {
  res.render("dashbord", { email: req.userName });
}

// logout function nd clear cookie
function logout(req, res) {
  res.clearCookie("token").redirect("/user/login");
}

//register User
async function addUser(req, res) {
  let addUser = new blogUser(req.body);
  try {
     addUser.save();
    res.redirect("/user/login");
  } catch (err) {
    res.redirect('/user/register')
  }
}

//for verifying Cookie
function cookiesVerify(req, res, token) {
  if (req.cookies.token === undefined) {
    res
      .cookie("token", token, { maxAge: 900000, httpOnly: true })
      .redirect("/dashbord");
  } else {
    res.redirect("/user/post");
  }
}

//authenticate user
async function authenticate(req, res) {
  try {
    const user = await blogUser.findOne(
      { userName: req.body.userName, password: req.body.password },
      { password: 0 }
    );
      try{
      jwt.sign({ user }, process.env.SECRET_KEY, function(err, token) {
        if (token) {
          cookiesVerify(req, res, token);
        }
      });
    }
      catch(e) {
      console.log(e)
      res.redirect("/user/login");
    }
  } catch (err) {
    res.redirect("/user/login");
  }
}

//exports modules
module.exports = {
  addUser,
  authenticate,
  getlogin,
  register,
  dashbord,
  logout,
  getHome,
  cookiesVerify
};
