const express = require('express')
const router = express.Router();

const userController = require('../controller/userController');
const postController = require('../controller/blogController');

const { verifyToken } = require('../middelware/middelware');

router.get('/user/register', userController.register);
router.post('/user/register', userController.addUser);


// router.get('/', userController.login);
router.get('/user/login', userController.getlogin);
router.post('user/login', userController.authenticate)

// router.post('/user/dashbord', userController.dashbord);

router.post('/user/authenticate', userController.authenticate);  
router.get('/user/logout', userController.logout);

router.get('/user/post', verifyToken, postController.Post);
router.get('/post/user', verifyToken, postController.getPost);
router.post('/post/user', verifyToken, postController.addPost);

module.exports = router;