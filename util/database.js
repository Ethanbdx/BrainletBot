import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import seed from './seed.js';
import config from '../config.js'

const dbPath = config.dbPath

const openConnection = () => {
    return open({
        filename: dbPath,
        driver: sqlite3.Database
    })
}

const getSound = async (soundName) => {
    const db = await openConnection()
    const result = await db.get('SELECT * from Sounds WHERE soundName = ?', soundName).finally(() => db.close())

    return result
}

const addSoundToDB = async (soundName, youtubeId, showInList = true) => {
    const db = await openConnection()
    let parameters = { ':soundName': soundName, ':youtubeId': youtubeId }

    const existingSound = await db.get('SELECT *  from Sounds WHERE soundName = :soundName OR YoutubeId = :youtubeId', parameters)

    if (existingSound) {
        throw 'Sound already exists!'
    }

    parameters[':showInList'] = showInList;

    await db.run('INSERT INTO Sounds (SoundName, YoutubeId, ShowInList) VALUES (:soundName, :youtubeId, :showInList)', parameters).finally(() => db.close())

}

const createDatabase = async () => {
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    })

    await db.exec('CREATE TABLE Sounds (SoundName TEXT PRIMARY KEY UNIQUE NOT NULL, YoutubeId TEXT UNIQUE NOT NULL, ShowInList BOOLEAN NOT NULL)')
    await db.exec('CREATE TABLE VibeCheck (UserId TEXT PRIMARY KEY UNIQUE NOT NULL, LastChecked DATETIME)')

    db.close();

    seed()
}

export {addSoundToDB, createDatabase, getSound}