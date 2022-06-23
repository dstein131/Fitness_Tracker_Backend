const express = require('express');
const userRouter = express.Router();
// const { getUser, createUser, getUserById, getUserByUsername } = require('../db/users');
const { getUserByUsername, getUser, createUser, getUserById, getPublicRoutinesByUser } = require("../db");



// Logs in the user. Requires username and password, and verifies that hashed login password matches the saved hashed password.
// If successful, returns the user object.
// If unsuccessful, returns a 404 status code and an error message.
// POST /api/users/login
userRouter.post('/login', async (req, res, next) => {
    console.log("login TEST");
   try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await getUser({ username, password: hash });
    if (user) {
        delete user.password;
        res.send(user);
    }
    else {
        res.status(404).send('User not found');
    }
    } catch (error) {
        throw error;

    
   }
}
);




// POST /api/users/register
// Create a new user. Require username and password, and hash password before saving user to DB. Require all passwords to be at least 8 characters long.
userRouter.post('/register', async (req, res, next) => {
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
userRouter.get('/me', async (req, res, next) => {
    const user = await getUserById(req.user.id);
    res.send(user);
    next()
}
)

// GET /api/users/:username/routines
// Get all routines for a user.
userRouter.get('/:username/routines', async (req, res, next) => {
    const user = await getUserByUsername(req.params.username);
    if (user) {
        res.send(user.routines);
    } else {
        res.status(404).send('User not found');
    }
    next()
}
)

module.exports = userRouter;
