const ytdl = require('ytdl-core-discord');
const mongoose = require('mongoose');
const privateConfig = require('../private');
const Sequelize = require('sequelize');
const VibeSchema = new mongoose.Schema( {
    UserId: {
        type: String,
        unique: true,
        required: true,
    },
    LastCheck: {
        type: Date,
        required: true
    }
});
const Vibes = mongoose.model("Vibe", VibeSchema);
class vibecheck {
    constructor() {
        this._command = "vibecheck";
    }
    help() {
        return "Brainlet will check your vibe.";
    }
    isThisCommand(command) {
        return command == this._command;
    }
    async runCommand(args, msgObject, client) {
        const canCheck = await this.canVibeCheck(msgObject);
        if (!canCheck) {
            return;
        }
        const vibe = Math.floor(Math.random() * 100);
        const voiceChannel = msgObject.member.voice.channel;
        const discordUser = msgObject.author.id;
        if (vibe > 85) {
            this.playsound(voiceChannel, client, true);
            const title = 'Brainlet approves of your vibes.';
            const desc = `${msgObject.member.user.username} vibes have been analyzed: ${vibe}% PASS :white_check_mark:`;
            const color = 0x71A324;
            this.generateMessage(client, msgObject, title, desc, color);
        }
        else if (vibe > 50) {
            const title = 'Brainlet approves of your vibes.';
            const desc = `${msgObject.member.user.username} vibes have been analyzed: ${vibe}%, you have passed the vibe check. :thumbsup:`;
            const color = 0x71A324;
            this.generateMessage(client, msgObject, title, desc, color);
        }
        else if (vibe > 15) {
            const title = 'Brainlet dissapproves of your vibes.';
            const desc = `${msgObject.member.user.username} vibes have been analyzed: ${vibe}%, you have failed the vibe check. :thumbsdown:`;
            const color = 0xA32432;
            this.generateMessage(client, msgObject, title, desc, color);
        }
        else {
            this.playsound(voiceChannel, client, false);
            const title = 'Brainlet disapproves of your vibes.';
            const desc = `${msgObject.member.user.username} vibes have been analyzed: ${vibe}% FAIL :x:`;
            const color = 0xA32432;
            this.generateMessage(client, msgObject, title, desc, color);
        }
    };
    playsound(voiceChannel, client, passed) {
        if(voiceChannel && voiceChannel.joinable && client.voice.connections.size == 0) {
            voiceChannel.join().then(async (connection) => {
                let sound = "";
                if(passed){
                    sound = "https://www.youtube.com/watch?v=04hXxI8TArU";
                }
                else {
                    sound = "https://www.youtube.com/watch?v=RxcHbiUfKlA";
                }
                const dispatcher = connection.play(await ytdl(sound), { type: 'opus' });
                dispatcher.on('error', err => {
                    console.log(`Error playing vibe check sound, requested on ${Date.now()} by ${msgObject.author.username}`);
                    console.log(err);
                });
                dispatcher.on('finish', end => {
                    voiceChannel.leave();
                });
            });
        }
        return;
    }
    generateMessage(client, msgObject, title, desc, color) {
        msgObject.channel.send({
            embed: {
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: title,
                thumbnail: {
                    url: msgObject.author.avatarURL
                },
                description: desc,
                color: color,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL
                }
            }
        });
    }
    async canVibeCheck(msgObject) {
        mongoose.connect(privateConfig.private.mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = mongoose.connection;
        db.on('open', () => {
            console.log("connection established")
        })
        const vibe = await Vibes.findOne({UserId: msgObject.author.id});
        if (vibe) {
            const timeDiff = Math.abs(new Date().valueOf() - vibe.LastCheck.valueOf());
            const hoursDiff = timeDiff / 36e5;
            console.log(hoursDiff);
            if (hoursDiff < 8) {
                msgObject.reply(`You still got ${(8 - hoursDiff).toFixed(2)} hour(s) left.`);
                return false;
            }
            else {
                await Vibes.updateOne({ UserId: msgObject.author.id }, { LastCheck: new Date() });
                return true;
            }
        }
        else {
            await Vibes.create({
                UserId: msgObject.author.id,
                LastCheck: new Date()
            });
            return true;
        }
    };
}
exports.default = vibecheck;