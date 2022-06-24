const client = require('./client')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUser = async ({ username, password }) => {
    // hash the password
    const hash = await bcrypt.hash(password, saltRounds);
    try {
        const { rows: [user] } = await client.query(`
            INSERT INTO users (username, password)
            VALUES ($1, $2)
            RETURNING *;
        `, [ username, hash ]);
        delete user.password;
        return user;
    } catch (error) {
        throw error;
    }
};

const getUser = async ({ username, password }) => {
    // hash the password
    const hash = await bcrypt.hash(password, saltRounds);
    try {
        const { rows: [user] } = await client.query(`
            SELECT * FROM users
            WHERE username = $1;
        `, [ username ]);
        if(user){
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                delete user.password
                return user;
            }
        }
    } catch (error) {
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        const { rows: [user] } = await client.query(`
            SELECT * FROM users
            WHERE id = $1;
        `, [ id ]);
        delete user.password;
        return user;
    } catch (error) {
        throw error;
    }
};

const getUserByUsername = async (username) => {
    try {
        const { rows: [user] } = await client.query(`
            SELECT id FROM users
            WHERE username = $1
        `, [username])
        return user;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername
};