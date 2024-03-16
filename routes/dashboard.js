// routes/dashboard.js

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Dashboard route (restricted to authenticated users)
router.get('/', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.redirect('/auth/signin'); // Redirect to sign-in page if user is not logged in
    }

    // Fetch user's blog posts from the database
    const userId = req.session.userId; // Assuming you have a userId associated with the session
    const posts = await Post.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });

    // Render the dashboard with user's posts
    res.render('dashboard', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to add a new blog post
router.post('/new', async (req, res) => {
  const { title, content } = req.body;

  try {
    // Create a new blog post
    const userId = req.session.userId; // Assuming you have a userId associated with the session
    await Post.create({ title, content, userId });

    // Redirect to the dashboard after adding the post
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to update a blog post
router.get('/edit/:postId', async (req, res) => {
  const postId = req.params.postId;

  try {
    // Fetch the post from the database
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    // Render the edit post form with the post data
    res.render('edit-post', { post });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.post('/edit/:postId', async (req, res) => {
  const postId = req.params.postId;
  const { title, content } = req.body;

  try {
    // Update the post in the database
    await Post.update({ title, content }, { where: { id: postId } });

    // Redirect back to the dashboard after updating the post
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to delete a blog post
router.post('/delete/:postId', async (req, res) => {
  const postId = req.params.postId;

  try {
    // Delete the post from the database
    await Post.destroy({ where: { id: postId } });

    // Redirect back to the dashboard after deleting the post
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
