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

//get a post
async function getPost(req, res) {
  try {
    let post, like, countlike, likeCounter = [], a = {};
    if (req.type === 0) {
      try {
        post = await blogPost.find({ userId: req.user });
        try {
          like = await likeModel.find({});
        } catch (err) {
          res.send(Message(400, false, `Error occured while finding post's like: ${err}`));
        }
        try {
          for (let i = 0; i < post.length; i++) {
            countlike = await likeModel.aggregate([{ "$match": { postId: { $eq: "" + post[i]._id } } }, { $group: { _id: post[i]._id, count: { $sum: 1 } } }]);
            if (countlike.length) {
              likeCounter.push(countlike);
            } else {
              likeCounter.push([a]);
            }
          }
        } catch (err) {
          res.send(Message(400, false, `Error occured while couting post's like: ${err}`));
        }
      }
      catch (err) {
        res.send(Message(400, false, `Error occured while finding post by user: ${err}`));
      }
      post.length > 0 ? res.render('viewPost', {
        success: req.flash('success'),
        msg: "", like: like, likeCount: likeCounter.flat(), moment, post: post, email: req.user
      }) : res.render('viewPost', {
        success: req.flash('success'), like: like,moment, likeCount: likeCounter.flat(),
        post: post, msg: "No Post Found", email: req.user
      });
    }
    else {
      try {
        post = await blogPost.find({});
        try {
          like = await likeModel.find({});
        } catch (err) {
          res.send(Message(400, false, `Error occured while finding post's like: ${err}`));
        }
        try {
          for (let i = 0; i < post.length; i++) {
            countlike = await likeModel.aggregate([{ "$match": { postId: { $eq: "" + post[i]._id } } }, { $group: { _id: post[i]._id, count: { $sum: 1 } } }]);
            if (countlike.length) {
              likeCounter.push(countlike);
            } else {
              likeCounter.push([a]);
            }
          }
        } catch (err) {
          res.send(Message(400, false, `Error occured while couting post's like: ${err}`));
        }
      }
      catch (err) {
        res.send(Message(400, false, `Error occured while finding post: ${err}`));
      }
      post.length > 0 ? res.render('viewPost', {
        success: req.flash('success'), msg: "", like: like, likeCount: likeCounter.flat(),
        post: post, email: req.user
      }) :
        res.render('viewPost', {
          success: req.flash('success'), like: like, likeCount: likeCounter.flat(),
          post: post, msg: "No Post Found", email: req.user
        });
    }
  } catch (err) {
    res.json(Message(false, "Error", err));
  }
}

// get a like function 
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
