const express = require("express");
const blogController = require('../../controller/blogController');
const { verifyToken } = require('../../middelware/middelware')

const router = express.Router();

router.post('/posts', verifyToken , function (req, res) {
  blogController.addPost
});

router.get('/posts', verifyToken, function (req, res) {
  blogController.getPost
});

module.exports = router;
