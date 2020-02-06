const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  type: {
    type: Number,
    default: 0
  }
});

const blogUser = mongoose.model('blogUsers', userSchema);
module.exports = blogUser;