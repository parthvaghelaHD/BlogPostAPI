const mongoose = require("mongoose");
const moment = require('moment')

const PostSchema = new mongoose.Schema({  
  userId: {
    type: String,
    require: true,
  },
  postId : {
    type: String,
    required: true,
  },
  title: {
    type: String,
    require: true,
    unique: true,
  },
  discription : {
    type: String,
    require: true,
    unique: true,
  },
  createdAt: {
    type: String,
    require: true,
    default:moment().format('DD-MM-YYYY')
  }
},
{timestamps : true}, { versionKey: false });

const blogPosts = mongoose.model("blogPost", PostSchema);
module.exports = blogPosts;
