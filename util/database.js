import sqlite3 from 'sqlite3';
import seed from './seed.js';
import { open } from 'sqlite';
import config from '../config.js'

const dbPath = config.dbPath

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

const openConnection = () => {
    return open({
        filename: dbPath,
        driver: sqlite3.Database
    })
}


export {createDatabase, openConnection}