import ytdl from 'ytdl-core'
import {saveSoundToDisk} from '../util/soundManager.js'
import { addSoundToDB } from '../util/database.js'

export default class addsound {
    constructor() { }

    help() {
        return {
            embed: {
                title: ".addsound",
                color: 5139196,
                description: "Brainlet will add a sound you give him to his soundboard.",
                fields: [
                    {
                        name: "Usage:",
                        value: ".addsound [Name] [YouTube URL]"
                    },
                    {
                        name: "[Name]",
                        value: "Case senstive name for the sound."
                    },
                    {
                        name: "[YouTube URL]",
                        value: "A valid YouTube URL that is under 1 minute."
                    }
                ]
            }
        };
    }

    async runCommand(args, msgObject, client) {
        if (args.length != 2) {
            msgObject.reply("You need to include the same of sound and url, like so .addsound [name] [url]");
            return;
        }
        const soundName = args[0], soundUrl = args[1];
        if (!ytdl.validateURL(soundUrl)) {
            msgObject.reply("That's an invalid YouTube Url! :dizzy_face:");
            return;
        }

        const info = await ytdl.getInfo(soundUrl)

        if (info.videoDetails.lengthSeconds > 60) {
            msgObject.reply("You can't add sounds longer than 1 minute!");
            return;
        }

        try {
            await addSoundToDB(soundName, info.videoDetails.videoId)
        }
        catch(err) {
            if(err === 'Sound already exists!') {
                msgObject.reply('A sound with that name or URL already exists!')
            }
            else {
                msgObject.reply("Hmm...something went wrong adding that sound to the database.")
            }

            return;
        }
            
        const audioStream = ytdl(soundUrl, { filter: 'audioonly', quality: 'highestaudio' });

        saveSoundToDisk(soundName, audioStream);

        msgObject.reply(`Successfully added \`${soundName}\` to the database! :greencard:`)
    }
}