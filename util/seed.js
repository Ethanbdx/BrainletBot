import { addSoundToDB } from "./database.js";
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
    addSoundToDB('thanosSnap', 'vJqA2fyMJQY', false)
    saveSoundToDisk('thanosSnap', audioStream)
}

function addVibePassSound() {
    const url = 'https://www.youtube.com/watch?v=04hXxI8TArU'
    const audioStream = ytdl(url, {filter: 'audioonly', quality: 'highestaudio'})
    addSoundToDB('vibePassed', '04hXxI8TArU', false)
    saveSoundToDisk('vibePassed', audioStream)
}

function addVibeFailSound() {
    const url = 'https://www.youtube.com/watch?v=RxcHbiUfKlA'
    const audioStream = ytdl(url, {filter: 'audioonly', quality: 'highestaudio'})
    addSoundToDB('vibeFailed', 'RxcHbiUfKlA', false)
    saveSoundToDisk('vibeFailed', audioStream)
}