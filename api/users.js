const express = require('express');
const router = express.Router();
const { getUser, createUser, getUserById, getUserByUsername } = require('../db/users');

// POST /api/users/login
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    const user = await getUser({ username, password });
    if (user) {
        res.send(user);
    } else {
        res.status(401).send('Invalid username or password');
    }
    next()
})

// POST /api/users/register
// Create a new user. Require username and password, and hash password before saving user to DB. Require all passwords to be at least 8 characters long.
router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    if (password.length < 8) {
        res.status(400).send('Password must be at least 8 characters long');
    } else {
        const user = await createUser({ username, password });
        res.send(user);
    }
    next()
}
)

// GET /api/users/me
// Get the current user.
router.get('/me', async (req, res, next) => {
    const user = await getUserById(req.user.id);
    res.send(user);
    next()
}
)

// GET /api/users/:username/routines
// Get all routines for a user.
router.get('/:username/routines', async (req, res, next) => {
    const user = await getUserByUsername(req.params.username);
    if (user) {
        res.send(user.routines);
    } else {
        res.status(404).send('User not found');
    }
    next()
}
)

module.exports = router;
