const blogPost = require('../model/posts');

async function addPost(req, res) {
  req.body.postId = req.post;
  let createPost;
  try {
    createPost = new blogPost(req.body);
    await createPost.save();
  } catch (err) {
    res.status(400).json({
      message: "error"
    });
  }
  res.send(createPost);
}


async function getPost(req, res) {
  try {
    if (req.type == 1) {
      const posts = await blogPost.find({});
      res.send(posts)
    } else {
      const posts = await blogPost.find({ userId : req.user });
      if (!posts) {
        return res.status(404).json({
          message: "post not found from get"
        });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
}


module.exports = { addPost , getPost}