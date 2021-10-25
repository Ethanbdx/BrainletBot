import { addSoundToDB } from "./soundDatabase.js";
import { saveSoundToDisk} from './soundManager.js'
import ytdl from "ytdl-core";

export default function seed() {
    console.log('Seeding default sounds...')
    addThanosSound()
    console.log('Added Thanos snap')
    addVibeFailSound()
    console.log('Added vibe check failed')
    addVibePassSound()
    console.log('Added vibe check passed')
}

function addThanosSound() {
    const url = 'https://www.youtube.com/watch?v=vJqA2fyMJQY'
    const audioStream = ytdl(url, {filter: 'audioonly', quality: 'highestaudio'})
    addSoundToDB('thanossnap', 'vJqA2fyMJQY', false)
    saveSoundToDisk('thanossnap', audioStream)
}

function addVibePassSound() {
    const url = 'https://www.youtube.com/watch?v=04hXxI8TArU'
    const audioStream = ytdl(url, {filter: 'audioonly', quality: 'highestaudio'})
    addSoundToDB('vibepassed', '04hXxI8TArU', false)
    saveSoundToDisk('vibepassed', audioStream)
}

function addVibeFailSound() {
    const url = 'https://www.youtube.com/watch?v=RxcHbiUfKlA'
    const audioStream = ytdl(url, {filter: 'audioonly', quality: 'highestaudio'})
    addSoundToDB('vibefailed', 'RxcHbiUfKlA', false)
    saveSoundToDisk('vibefailed', audioStream)
}