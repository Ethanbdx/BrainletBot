const ytdl = require("ytdl-core");
const fs = require('fs');
const { getSoundAudioStream } = require('../util/soundDiskManager');
const { getSound } = require('../util/database');

class playsound {
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
        if (!soundName) {
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
                const voiceStream = connection.play(getSoundAudioStream(sound.SoundName));
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
            } catch {
                msgObject.reply(`Something went wrong while playing \`${sound.SoundName}\``);
                connection.disconnect();
            }
        }
        else {
            msgObject.reply(`I couldn't find sound named \`${soundName}\` in my database, maybe you should add it or use .listsounds to see all the available sounds.`);
        }
    }
}
exports.default = playsound;