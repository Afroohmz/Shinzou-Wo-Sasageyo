// routes/home.js

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Homepage route
router.get('/', async (req, res) => {
  try {
    // Fetch existing blog posts from the database
    const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
    res.render('home', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
