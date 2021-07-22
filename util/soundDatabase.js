import {openConnection} from './database.js'

const getAllSounds = async () => {
    const db = await openConnection()
    const result = await db.all('SELECT SoundName from Sounds WHERE ShowInList').finally(() => db.close())

    return result
}

const getSound = async (soundName) => {
    const db = await openConnection()
    const result = await db.get('SELECT * from Sounds WHERE SoundName = ?', soundName).finally(() => db.close())

    return result
}

const addSoundToDB = async (soundName, youtubeId, showInList = true) => {
    const db = await openConnection()
    let parameters = { ':soundName': soundName, ':youtubeId': youtubeId }

    const existingSound = await db.get('SELECT *  from Sounds WHERE SoundName = :soundName OR YoutubeId = :youtubeId', parameters)

    if (existingSound) {
        throw 'Sound already exists!'
    }

    parameters[':showInList'] = showInList;

    await db.run('INSERT INTO Sounds (SoundName, YoutubeId, ShowInList) VALUES (:soundName, :youtubeId, :showInList)', parameters).finally(() => db.close())

}

const deleteSoundFromDB = async (soundName) => {
    const db = await openConnection();
    const existingSound = await getSound(soundName);
    
    if(!existingSound) {
        throw 'No existing sound!'
    }

    await db.run('DELETE FROM Sounds WHERE SoundName = ?', soundName).finally(() => db.close())

}


export {addSoundToDB, getSound, getAllSounds, deleteSoundFromDB}