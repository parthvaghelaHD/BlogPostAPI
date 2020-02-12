require("dotenv").config();
const jwt = require("jsonwebtoken");

const blogPost = require("../model/postModel");
const { Message } = require("../commonFunction/commonfunction");

async function addPost(req, res) {
  req.body.userId = req.user;
  console.log(req.body)
  let createpost = new blogPost(req.body);
  try {
    const post = await createpost.save();
    res.render('addPost', { msg: "Post Added Successfully", email: req.user });
  } catch (err) {
    res.render('addPost', { msg: "Problem While Post Adding.", email: req.user });
  }
}



// adding a post
function Post(req, res) {
  res.render("addPost", { msg: "", email: req.user });
}



//
async function getPost(req, res) {
  try {
    let post;
    console.log(req.type,req.user);
    if (req.type == 0) {
      post = await blogPost.find({ userId: req.user });
      post.length > 0 ? res.render('viewPost', { post: post, email: req.user }) :
        res.render('viewPost', "Post Not Found");
    }
    else {
      post = await blogPost.find({});
      post.length > 0 ? res.render('viewPost', { post: post, email: req.user }) :
        res.render('viewPost', "Post Not Found");
    }
  } catch (err) {
    res.json(Message(false, "Error", err));
  }
}


module.exports = { addPost, getPost, Post };
