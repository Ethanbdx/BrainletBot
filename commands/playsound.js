import { getSoundAudioStream } from '../util/soundManager.js'
import { getSound } from '../util/soundDatabase.js'

export default class playsound {
    constructor() { }
    help() {
        return {
            embed: {
                title: ".playsound",
                color: 5139196,
                description: "Brainlet will play a sound from his sound board.",
                fields: [
                    {
                        name: "Usage:",
                        value: ".playsound [Name]"
                    },
                    {
                        name: "[Name]",
                        value: "An existing sound name."
                    }
                ]
            }
        };
    }
    async runCommand(args, msgObject, client) {
        const soundName = args;
        const voiceChannel = msgObject.member.voice.channel;
        if (!soundName || soundName.length === 0) {
            msgObject.reply("You need to enter a sound to play, using .playsound [soundname]");
            return;
        }
        if (!voiceChannel) {
            msgObject.reply("You need to be in a voice channel to use this command.");
            return;
        }
        if (client.voice.connections.size != 0) {
            msgObject.reply("I'm not done yet!");
            return;
        }

        const sound = await getSound(soundName)

        if (sound) {
            const connection = await voiceChannel.join()
            try {
                const voiceStream = connection.play(getSoundAudioStream(soundName));
                voiceStream.on('start', () => {
                    msgObject.reply(`Now playing \`${sound.SoundName}\`.`);
                });
                voiceStream.on('error', () => {
                    msgObject.reply(`Something went wrong while playing \`${sound.SoundName}\``);
                    connection.disconnect();
                });
                voiceStream.on('finish', (end) => {
                    connection.disconnect();
                });
            } catch(err) {
                console.log(err)
                msgObject.reply(`Something went wrong while playing \`${sound.SoundName}\``);
                connection.disconnect();
            }
        }
        else {
            msgObject.reply(`I couldn't find sound named \`${soundName}\` in my database, maybe you should add it or use .listsounds to see all the available sounds.`);
        }
    }
}