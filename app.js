const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRouter = require("./api/routes/user");
const blogRouter = require("./api/routes/blog");
const router = require("./routes/routes");
// const middleware = require('middleware')

const app = express();

mongoose.connect(
  process.env.mongoURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, res) => {
    if (!err) {
      console.log("Connection Established with mongodb .....!!");
    }
  }
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(router);

app.use(userRouter);
app.use(blogRouter);

module.exports = app;
