const express = require('express');
const router = express.Router();

// GET /api/routines
router.get('/', async (req, res, next) => {
    res.send('GET /api/routines');
    next()
}
);

// POST /api/routines
router.post('/', async (req, res, next) => {
    res.send('POST /api/routines');
    next()
}
);

// PATCH /api/routines/:routineId
router.patch('/:routineId', async (req, res, next) => {
    res.send('PATCH /api/routines/:routineId');
    next()
}
);

// DELETE /api/routines/:routineId
router.delete('/:routineId', async (req, res, next) => {
    res.send('DELETE /api/routines/:routineId');
    next()
}
);

// POST /api/routines/:routineId/activities
router.post('/:routineId/activities', async (req, res, next) => {
    res.send('POST /api/routines/:routineId/activities');
    next()
}
);

module.exports = router;
