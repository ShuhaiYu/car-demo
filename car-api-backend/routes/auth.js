const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');

// Convert db.query to Promise-based
db.query = util.promisify(db.query);

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

// Generate access token
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '15m',
  });
};

// Generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: '7d' });
};

// User register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }

  try {
    // Check if user exists
    const existingUsers = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [
      username,
      hashedPassword,
    ]);

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'User registration failed' });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }

  try {
    const users = await db.query('SELECT * FROM users WHERE username = ?', [
      username,
    ]);
    if (users.length === 0) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const user = users[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token in the database
    await db.query('UPDATE users SET refresh_token = ? WHERE id = ?', [
      refreshToken,
      user.id,
    ]);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token is required' });
  }

  try {
    const users = await db.query('SELECT * FROM users WHERE refresh_token = ?', [
      refreshToken,
    ]);

    if (users.length === 0) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    const user = users[0];
    const accessToken = generateAccessToken(user);

    res.json({ accessToken });
  } catch (error) {
    console.error('Error during token refresh:', error);
    res.status(500).json({ error: 'Token refresh failed' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    await db.query(
      'UPDATE users SET refresh_token = NULL WHERE refresh_token = ?',
      [refreshToken]
    );
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

module.exports = router;
