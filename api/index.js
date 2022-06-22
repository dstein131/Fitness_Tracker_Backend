// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router



const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


const express = require('express');
const apiRouter = express.Router();



// GET /api/health
apiRouter.get('/health', async (req, res, next) => {
    res.send('OK');
    next()
});

// ROUTER: /api/users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

// ROUTER: /api/activities
const activitiesRouter = require('./activities');
apiRouter.use('/activities', activitiesRouter);

// ROUTER: /api/routines
const routinesRouter = require('./routines');
apiRouter.use('/routines', routinesRouter);

// ROUTER: /api/routine_activities
const routineActivitiesRouter = require('./routineActivities');
apiRouter.use('/routine_activities', routineActivitiesRouter);

module.exports = apiRouter;