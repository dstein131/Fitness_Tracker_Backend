const client = require('./client');

async function getRoutineById(id){

  const result = await client.query(`
    SELECT * FROM routines
    WHERE id = $1;
  `, [id]);

  return result.rows[0];
}

async function getRoutinesWithoutActivities(){

  const result = await client.query(`
    SELECT * FROM routines
    WHERE id NOT IN (SELECT routineid FROM routine_activities);
  `);

  return result.rows;
}


async function getAllRoutines() {

  const result = await client.query(`
    SELECT * FROM routines;
  `);

  return result.rows;
}

async function getAllRoutinesByUser({username}) {

  const result = await client.query(`
    SELECT * FROM routines
    WHERE creator_id = (SELECT id FROM users WHERE username = $1);
  `, [username]);

  return result.rows;
}

async function getPublicRoutinesByUser({username}) {

  const result = await client.query(`
    SELECT * FROM routines
    WHERE creator_id = (SELECT id FROM users WHERE username = $1)
    AND ispublic = true;
  `, [username]);

  return result.rows;
}

async function getAllPublicRoutines() {

  const result = await client.query(`
    SELECT * FROM routines
    WHERE ispublic = true;
  `);

  return result.rows;

}

async function getPublicRoutinesByActivity({id}) {

  const result = await client.query(`
    SELECT * FROM routines
    WHERE id IN (SELECT routineid FROM routine_activities
    WHERE activityid = $1);
  `, [id]);

  return result.rows;

 
}

async function createRoutine({creatorId, isPublic, name, goal}) {
  
    const result = await client.query(`
      INSERT INTO routines (creatorid, ispublic, name, goal)
      VALUES ($1, $2, $3, $4)
      RETURNING id, creatorid, ispublic, name, goal;
    `, [creatorId, isPublic, name, goal]);

    return result.rows[0];

  
}

async function updateRoutine({id, ...fields}) {

  const result = await client.query(`
    UPDATE routines
    SET ${Object.keys(fields).map(key => `${key} = ${fields[key]}`).join(', ')} 
    WHERE id = $1
    RETURNING id, creatorid, ispublic, name, goal;
  `, [id]);

  return result.rows[0];

}

async function destroyRoutine(id) {
  
    const result = await client.query(`
      DELETE FROM routines
      WHERE id = $1
      RETURNING id, creatorid, ispublic, name, goal;
    `, [id]);

    return result.rows[0];
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
}