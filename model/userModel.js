const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number
    },
    name: {
      type: String,
      require: true,
      unique: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    mobile: {
      type: String,
      maxlength: 10
    },
    userName: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true,
      minlength: 5
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
