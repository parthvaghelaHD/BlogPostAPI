const express = require('express')
const router = express.Router();

// require Controllers
const userController = require('../controller/userController');
const postController = require('../controller/blogController');

// middelware of verifyToken
const { verifyToken } = require('../middelware/middelware');

// get register form with get method of register and register an user with post method 
router.get('/user/register', userController.register);
router.post('/user/register', userController.addUser);

// get home page without login and after login dashbord page
router.get('/', userController.getHome)
router.get('/dashbord', userController.dashbord)

// get login page and post login data
router.get('/user/login', userController.getlogin);
router.post('/user/login', userController.authenticate)

//authenticate and get logout page 
router.post('/user/authenticate', userController.authenticate);  
router.get('/user/logout', userController.logout);

//add posts 
router.get('/user/post', verifyToken, postController.Post);

//get likes 
router.post('/like', verifyToken, postController.like);

//get post and add posts
router.get('/post/user', verifyToken, postController.getPost);
router.post('/post/user', verifyToken, postController.addPost);

//like post
// router.post('/post/like', verifyToken, postController.like);

module.exports = router;