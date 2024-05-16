// backend/routes/auth.js

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/pool');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();
const secretKey = 'f53623b3b60da9221369';

// User signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Signup error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// User login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.rows[0].id, username: user.rows[0].username }, secretKey, { expiresIn: '1h' });
        
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// User data route
router.get('/user', verifyToken, (req, res) => {
    res.json({ username: req.user.username });
});

// Protected route
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
    // res.send("This is a protected route for user ${req.user}")
});

// User logout route
router.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
});

module.exports = router;
