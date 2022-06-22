const express = require('express');
const router = express.Router();
const {getActivityById, getAllActivities} = require('../db/activities');

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async (req, res, next) => {
    const activityId = req.params.activityId;
    const activity = await getActivityById(activityId);
    if (activity) {
        res.send(activity.routines);
    } else {
        res.status(404).send('Activity not found');
    }
    next()
}
);

// GET /api/activities
router.get('/', async (req, res, next) => {
    const activities = await getAllActivities();
    res.send(activities);
    next()
}
);


// POST /api/activities
router.post('/', async (req, res, next) => {
    const activity = req.body;
    res.send(activity);
    next()
}
);

// PATCH /api/activities/:activityId

module.exports = router;
