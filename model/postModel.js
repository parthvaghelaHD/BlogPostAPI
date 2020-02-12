const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({  
  userId: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  discription : {
    type: String,
    require: true,
  }
}, { versionKey: false });

const blogPosts = mongoose.model("blogPost", PostSchema);
module.exports = blogPosts;
