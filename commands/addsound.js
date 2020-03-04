const ytdl = require("ytdl-core");
const mongoose = require("mongoose");
const privateConfig = require("../private");
const Sound = require("../models/Sound");
class addsound {
    constructor() {
        this._command = "addsound";
    }
    help() {
        return "Brainlet will remeber a sound you give him.";
    }
    isThisCommand(command) {
        return command === this._command;
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
            mongoose.connect(privateConfig.private.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
            const sound = new Sound({
                Name: soundName,
                Url: soundUrl,
                CreatedBy: msgObject.author.id
            }).save( (err, res) => {
                if(err) {
                    if(err.code == 11000) {
                        msgObject.reply("That sound name or link already exists!");
                        return;
                    }
                    msgObject.reply("Something went wrong!!");
                    return;
                }
                msgObject.reply(`${soundName} successfully added!`);
                return;
            });
        });
    }
}
exports.default = addsound;
