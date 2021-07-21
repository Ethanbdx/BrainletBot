import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
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

const addSoundToDB = async (soundName, youtubeId) => {
    const db = await openConnection()
    const parameters = { ':soundName': soundName, ':youtubeId': youtubeId }

    const existingSound = await db.get('SELECT *  from Sounds WHERE soundName = :soundName OR YoutubeId = :youtubeId', parameters)

    console.log(existingSound)

    if (existingSound) {
        throw 'Sound already exists!'
    }

    await db.run('INSERT INTO Sounds (SoundName, YoutubeId) VALUES (:soundName, :youtubeId)', parameters).finally(() => db.close())

}

const createDatabase = async () => {
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    })

    await db.exec('CREATE TABLE Sounds (SoundName TEXT PRIMARY KEY UNIQUE NOT NULL, YoutubeId TEXT UNIQUE NOT NULL)')
    await db.exec('CREATE TABLE VibeCheck (UserId TEXT PRIMARY KEY UNIQUE NOT NULL, LastChecked DATETIME)')

    db.close();
}

export {addSoundToDB, createDatabase, getSound}