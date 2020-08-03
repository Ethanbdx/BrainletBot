const ytdl = require("ytdl-core");
const mongoose = require("mongoose");
const privateConfig = require("../private");
const Sound = require("../models/Sound");
class addsound {
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
                  name : "[Name]",
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
    runCommand(args, msgObject, client) {
        if (args.length != 2) {
            msgObject.reply("You need to include the same of sound and url, like so .addsound [name] [url]");
            return;
        }
        const soundName = args[0], soundUrl = args[1];
        if (!soundUrl.includes('youtube.com/watch?')) {
            msgObject.reply("That's an invalid YouTube Url! :dizzy_face:");
            return;
        }
        if (soundUrl.includes('playlist' || 'list')) {
            msgObject.reply("You can't add a playlist!");
        }
        ytdl.getInfo(soundUrl, async (err, info) => {
            try {
                if (info.length_seconds > 60) {
                    msgObject.reply("You can't add sounds longer than 1 minute!");
                    return;
                }
            }
            catch (e) {
                console.log(e);
                if (e.name === 'UnhandledPromiseRejectionWarning') {
                    msgObject.reply("I am unable to read the length of this video >:(");
                    return;
                }
                else {
                    msgObject.reply("I don't know what...but something went wrong");
                    return;
                }
            }
            mongoose.connect(privateConfig.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
            let sound = await Sound.findOne({ Name: soundName, Url: soundUrl}).exec();
            if(sound) {
                msgObject.reply("A sound with that name or url already exists!")
                return;
            }
            sound = await new Sound({
                Name: soundName,
                Url: soundUrl,
                CreatedBy: msgObject.author.id
            }).save();
            mongoose.connection.close();
            if(sound.errors) {
                msgObject.reply("There was an issue adding the sound the database. :(")
            }
            msgObject.reply(`Successfully added \`${soundName}\` to the database!`)
        })
    }
}
exports.default = addsound;
