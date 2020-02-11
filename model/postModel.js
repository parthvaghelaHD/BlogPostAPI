const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({  
  userid: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
    maxlength: 40
  },
  content: {
    type: String,
    require: true,
  }
}, { versionKey: false });

const blogPosts = mongoose.model("blogPost", PostSchema);
module.exports = blogPosts;
