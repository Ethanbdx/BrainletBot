const mongoose = require("mongoose");
const Sound = require("../models/Sound");
const privateConfig = require("../private");
const ytdl = require("ytdl-core");
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
        mongoose.connect(privateConfig.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
        const sound = await Sound.findOne({ Name: new RegExp('^'+soundName+'$', "i")}).exec();
        mongoose.connection.close();
            if (sound) {
                const connection = await voiceChannel.join()
                try {
                    const voiceStream = connection.play(ytdl(sound.Url, {quality: 'highestaudio'}));
                    voiceStream.on('start', () => {
                    msgObject.reply(`Now playing \`${sound.Name}\`.`);
                    });
                    voiceStream.on('error', () => {
                        msgObject.reply(`Something went wrong while playing \`${sound.Name}\``);
                        connection.disconnect();
                    });
                    voiceStream.on('finish', (end) => {
                        connection.disconnect();
                    });
                } catch {
                    msgObject.reply(`Something went wrong while playing \`${sound.Name}\``);
                     connection.disconnect();
                }
            } 
            else {
                msgObject.reply(`I couldn't find sound named \`${soundName}\` in my database, maybe you should add it or use .listsounds to see all the available sounds.`);
            }
    }
}
exports.default = playsound;