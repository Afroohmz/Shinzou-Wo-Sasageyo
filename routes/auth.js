// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // For password hashing
const User = require('../models/User');

// Route to render the sign-up form
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Route to handle user sign-up
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).render('signup', { message: 'Username already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await User.create({ username, password: hashedPassword });

    // Redirect to the sign-in page after successful sign-up
    res.redirect('/auth/signin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to render the sign-in form
router.get('/signin', (req, res) => {
  res.render('signin');
});

// Route to handle user sign-in
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).render('signin', { message: 'Invalid username or password' });
    }

    // Set the user session
    req.session.loggedIn = true;
    req.session.userId = user.id; // Assuming you have a userId associated with the user

    // Redirect to the dashboard after successful sign-in
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to handle user logout
router.get('/logout', (req, res) => {
  // Destroy the user session
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
    // Redirect to the home page after successful logout
    res.redirect('/');
  });
});

module.exports = router;
