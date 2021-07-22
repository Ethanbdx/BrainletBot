import fs from 'fs'

const saveSoundToDisk = (soundName, audioStream) => {

    const audioWritableStream = fs.createWriteStream(`./sounds/${soundName}.mp3`)

    const stream = audioStream.pipe(audioWritableStream);

    stream.on('finish', (res) => {
        console.log(`${soundName} saved to disk.`);
    })

}

const deleteSoundFromDisk = async (soundName) => {
    await fs.unlinkSync(`./sounds/${soundName}.mp3`)
}

const getSoundAudioStream = (soundName) => {
    return fs.createReadStream(`./sounds/${soundName}.mp3`);
}

export { saveSoundToDisk, deleteSoundFromDisk, getSoundAudioStream }
