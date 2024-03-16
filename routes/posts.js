// routes/posts.js

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Route to render a single blog post page
router.get('/:postId', async (req, res) => {
  const postId = req.params.postId;

  try {
    // Fetch the post content from the database
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    // Fetch comments associated with the post
    const comments = await Comment.findAll({ where: { postId }, order: [['createdAt', 'ASC']] });

    // Render the post page with post content and comments
    res.render('post', { post, comments });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to add a new comment to a post
router.post('/:postId/comment', async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;

  try {
    // Create a new comment associated with the post
    await Comment.create({ content, postId });

    // Redirect back to the post page after adding the comment
    res.redirect(`/posts/${postId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
