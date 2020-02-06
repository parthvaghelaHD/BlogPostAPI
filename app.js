const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const userRouter = require('./api/routes/user');
const blogRouter = require('./api/routes/blog');

const app = express();

const mongodb = 'mongodb://localhost:27017/blogposts';

mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

},(err, res) => {
  if(!err){
    console.log('Connection Established with mongodb .....!!')
  }
});
app.use(express.json());
app.use(morgan('dev'));

app.use(userRouter);
app.use(blogRouter);

module.exports = app;
