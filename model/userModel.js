const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number
    },
    userName: {
      type: String
    },
    password: {
      type: String,
      require: true
    },
    type: {
      type: Number,
      default: 0,
      require: true,
      maxlength: 1
    }
  },
  { versionKey: false }
);

const blogUser = mongoose.model("blogUsers", userSchema);
module.exports = blogUser;
