const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    userName: {
      type: String,
      require: true
    },
    email: {
      type: String,
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
