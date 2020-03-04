const ytdl = require('ytdl-core');
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
            try {
                const sound = await Sounds.create({
                    Name: soundName,
                    Url: soundUrl,
                    CreatedBy: `${msgObject.author.username}#${msgObject.member.user.discriminator}`
                });
                msgObject.reply(`${soundName} successfully added!`);
                return;
            }
            catch (e) {
                console.log(e);
                if (e.name === 'SequelizeUniqueConstraintError') {
                    msgObject.reply('That sound already exists!');
                }
                else {
                    msgObject.reply('Something went wrong while adding that sound...' + Error);
                }
            }
        });
    }
}
exports.default = addsound;
