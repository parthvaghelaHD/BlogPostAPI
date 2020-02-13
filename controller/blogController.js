const jwt = require('jsonwebtoken')
require('dotenv').config();

const blogPost = require("../model/postModel");
const { Message } = require("../commonFunction/commonfunction");

// for add a post from perticular user
async function addPost(req, res) {
  req.body.userId = req.user;
  let createpost = new blogPost(req.body);
  try {
    const post = await createpost.save();
    req.flash('success', 'post added sucessfully')
    res.redirect('/post/user');
  } catch (err) {
    res.render('addPost', { msg: 'Problem While Post Adding.', email: req.user });
  }
}

// adding a post 
function Post(req, res) {
  res.render("addPost", { msg: "", email: req.user });
}

// get a post from perticular user
async function getPost(req, res) {
  try {
    let post;
    if (req.type == 0) {
      post = await blogPost.find({ userId: req.user });
      post.length > 0 ? res.render('viewPost', { msg: req.flash('success'), post: post, email: req.user }) :
        res.render('viewPost', { msg:"Post Not Found", post: 0, email: req.user });
    }
    if (req.type == 1) {
      post = await blogPost.find({});
      post.length > 0 ? res.render('viewPost', { msg:req.flash('success'), post: post, email: req.user }) :
        res.render('viewPost', { msg:"Post Not Found", post: 0, email: req.user});
    }
  } catch (err) {
    res.json(Message(false, "Error", err));
  }
}

module.exports = { addPost, Post, getPost };