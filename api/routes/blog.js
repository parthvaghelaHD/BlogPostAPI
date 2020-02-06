const express = require("express");
const blogController = require('../../controller/blogController');
const { verifyToken } = require('../../middelware/middelware')

const router = express.Router();

router.post('/posts', verifyToken , blogController.addPost);
router.get('/posts', verifyToken, blogController.getPost);

module.exports = router;
