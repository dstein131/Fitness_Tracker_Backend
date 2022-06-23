const express = require('express');
const routinesRouter = express.Router();

// GET /api/routines
routinesRouter.get('/', async (req, res, next) => {
    res.send('GET /api/routines');
    next()
}
);

// POST /api/routines
routinesRouter.post('/', async (req, res, next) => {
    res.send('POST /api/routines');
    next()
}
);

// PATCH /api/routines/:routineId
routinesRouter.patch('/:routineId', async (req, res, next) => {
    res.send('PATCH /api/routines/:routineId');
    next()
}
);

// DELETE /api/routines/:routineId
routinesRouter.delete('/:routineId', async (req, res, next) => {
    res.send('DELETE /api/routines/:routineId');
    next()
}
);

// POST /api/routines/:routineId/activities
routinesRouter.post('/:routineId/activities', async (req, res, next) => {
    res.send('POST /api/routines/:routineId/activities');
    next()
}
);

module.exports = routinesRouter;
