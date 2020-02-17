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
    },
    status: {
      type: Number,
      require: true,
      default: 0
    }
  },
  {timestamps : true},
  {
    versionKey: false
  }
);

const likePost = mongoose.model('likePost', likePostSchema);
module.exports = likePost;