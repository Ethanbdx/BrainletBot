const fs = require('fs');

exports.saveSoundToDisk = (soundName, audioStream) => {

    const audioWritableStream = fs.createWriteStream(`./sounds/${soundName}.mp3`)

    const stream = audioStream.pipe(audioWritableStream);

    stream.on('finish', (res) => {
        console.log('file saved');
    })

}

exports.removeSoundFromDisk = (soundName) => {
    fs.unlink(`./sounds/${soundName}.mp3`)
}

exports.getSoundAudioStream = (soundName) => {
    return fs.createReadStream(`./sounds/${soundName}.mp3`);
}

