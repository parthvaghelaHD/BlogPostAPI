const jwt = require("jsonwebtoken");
const moment = require('moment')
require("dotenv").config();

const blogPost = require("../model/postModel");
const likeModel = require("../model/postLikeModel");
const { Message } = require("../commonFunction/commonfunction");

// for add a post from perticular user
async function addPost(req, res) {
  req.body.userId = req.user;
  req.body.postId = req.id;
  let createpost = new blogPost(req.body);
  try {
    createpost.save();
    req.flash("success", "post added sucessfully");
    res.redirect("/post/user");
  } catch (err) {
    res.render("addPost", {
      msg: "Problem While Post Adding.",
      email: req.user
    });
  }
}

// adding a post
function Post(req, res) {
  res.render("addPost", { msg: "", email: req.user });
}

// get a post
async function getPost(req, res) {
  try {
    let post, like;
    if (req.type === 0) {
      try {
        post = await blogPost.find({ userId: req.user });
        try {
          like = await likeModel.find({});
        } catch (err) {
          res.send(
            Message(
              400,
              false,
              `Error occured while finding post's like: ${err}`
            )
          );
        }
      } catch (err) {
        res.send(
          Message(
            400,
            false,
            `Error occured while finding post by user: ${err}`
          )
        );
      }
      post.length > 0
        ? res.render("viewPost", {
            success: req.flash("success"),
            msg: "",
            like: like,
            post: post,
            email: req.user,
            moment: moment 
          })
        : res.render("viewPost", {
            success: req.flash("success"),
            like: like,
            post: post,
            msg: "No Post Found",
            email: req.user,
            moment: moment 
          });
    } else {
      post = await blogPost.find({});
      like = await likeModel.find({});
      post.length > 0
        ? res.render("viewPost", {
            success: req.flash("success"),
            msg: "",
            like: like,
            post: post,
            email: req.user,
            moment: moment 
          })
        : res.render("viewPost", {
            success: req.flash("success"),
            like: like,
            post: post,
            msg: "No Post Found",
            email: req.user,
            moment: moment 
          });
    }
  } catch (err) {
    res.json(Message(false, "Error", err));
  }
}

async function like(req, res) {
  let resData, flag = 0;
  try {
    const likeExists = await likeModel.findOne({
      postId: req.body.postId, userId: req.body.userId
    });
    if (likeExists) {
      try {
        resData = await likeModel.deleteOne({ postId: req.body.postId, userId: req.body.userId });
        if (resData) {
          flag = 0;
        }
      } catch (err) {
        res.send(Message(400, false, `Error occured while liking a post ${err}`));
      }
    } else {
      try {
        data = new likeModel(req.body);
        resData = await data.save();
        if (resData) {
          flag = 1;
        }
      } catch (err) {
        res.send(Message(400, false, `Error occured while liking a post: ${err}`));
      }
    }
    res.json(flag);
  } catch (err) {
    res.send(Message(400, false, `Error occured while liking a post: ${err}`));
  }
}

module.exports = { addPost, Post, getPost, like };
