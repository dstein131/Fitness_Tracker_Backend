const client = require("./client")

// database functions
async function getAllActivities() {
  // get all activities
  const result = await client.query(`
    SELECT * FROM activities;
  `);

  // return the activities
  return result.rows;

}

async function getActivityById(id) {

  // get an activity by id
  const result = await client.query(`
    SELECT * FROM activities
    WHERE id = $1;
  `, [id]);

  // return the activity
  return result.rows[0];
  
}

async function getActivityByName(name) {

  // get an activity by name
  const result = await client.query(`
    SELECT * FROM activities
    WHERE name = $1;
  `, [name]);

  // return the activity
  return result.rows[0];

}

async function attachActivitiesToRoutines(routines) {
  
    // attach activities to routines
    const result = await client.query(`
      INSERT INTO routine_activities (routineid, activityid)
      SELECT id, activityid FROM routine_activities
      WHERE id = ANY($1::int[])
    `, [routines.map(routine => routine.id)]);

    // return the updated activity
    return result.rows;

    

}

// select and return an array of all activities
async function createActivity({ name, description }) {

  // create a new activity
  const result = await client.query(`
    INSERT INTO activities (name, description)
    VALUES ($1, $2)
    RETURNING id, name, description;
  `, [name, description]);

  // return the new activity
  return result.rows[0];

}

// return the new activity
async function updateActivity({ id, ...fields }) {
  
    // update an activity
    const result = await client.query(`
      UPDATE activities
      SET ${Object.keys(fields).map(key => `${key} = '${fields[key]}'`).join(", ")}
      WHERE id = $1
      RETURNING id, name, description;
    `, [id]);

    // return the updated activity
    return result.rows[0];

}

// don't try to update the id
// do update the name and description
// return the updated activity
module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
}
