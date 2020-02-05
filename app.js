const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')

const userRouter = require('./api/routes/user')
const blogUser = require('./model/user')

const mongodb = 'mongodb://localhost:27017/blogposts'
app.use(express.json());

mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

},(err, res) => {
  if(!err){
    console.log('Connection Established with mongodb .....!!')
  }
})  

app.use(morgan('dev'))
app.use('/', userRouter)

module.exports = app;
