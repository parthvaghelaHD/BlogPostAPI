const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  postId: {
    type: Number,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  }
  
})

const blogPosts = mongoose.model("blogPost", PostSchema);
module.exports = blogPosts;
