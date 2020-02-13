const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    userName: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      require: true,
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

userSchema.plugin(uniqueValidator);
const blogUser = mongoose.model("blogUsers", userSchema);
module.exports = blogUser;
