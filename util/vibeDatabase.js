import {openConnection} from './database.js';

const getUser = async (userId) => {
    const db = await openConnection();
    const result = await db.get('SELECT * from VibeCheck WHERE UserId = ?', userId).finally(() => db.close())

    return result;
}

const updateLastChecked = async (userId, lastChecked) => {
    const db = await openConnection();
    await db.run('UPDATE VibeCheck SET LastChecked = ? WHERE UserId = ?', lastChecked, userId).finally(() => db.close())
}

const addUser = async (userId) => {
    const db = await openConnection();
    const parameters = { ':userId': userId, ':lastChecked': new Date()}
    await db.run('INSERT INTO VibeCheck (UserId, LastChecked) VALUES (:userId, :lastChecked)', parameters)
}

export default {
    getUser,
    updateLastChecked,
    addUser
}