const mongoose = require("mongoose");
const Sound = require("../models/Sound");
const privateConfig = require("../private");
const ytdl = require("ytdl-core-discord");
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
        mongoose.connect(privateConfig.private.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
        const sound = await Sound.findOne({ Name: new RegExp('^'+soundName+'$', "i")}).exec();
        mongoose.connection.close();
            if (sound) {
                voiceChannel.join().then(async (connection) => {
                    const stream = connection.play(await ytdl(sound.Url), {type: 'opus'});
                    stream.on('error', (end) => {
                        msgObject.reply(`Something went wrong while playing \`${sound.Name}\``);
                    });
                    stream.on('finish', (end) => {
                        connection.disconnect();
                    });
                });
                msgObject.reply(`Now playing \`${sound.Name}\`.`);
                return;
            }
            msgObject.reply(`I couldn't find any matching \`${soundName}\` in my database, maybe you should add it or use .listsounds to see all the available sounds.`);
    }
}
exports.default = playsound;