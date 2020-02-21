const mongoose = require("mongoose");

const likePostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    postId: {
      type: String,
      required: true
    }
  }
);

const likePost = mongoose.model('likePost', likePostSchema);
module.exports = likePost;