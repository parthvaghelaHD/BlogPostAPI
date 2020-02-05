const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  }
});

const blogPosts = mongoose.model("blogPost", blogSchema);
module.exports = blogPosts;
