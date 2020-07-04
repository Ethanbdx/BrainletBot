const ytdl = require('ytdl-core-discord');
const mongoose = require('mongoose');
const privateConfig = require('../private');
const Vibe = require("../models/Vibe");


class vibecheck {
    constructor() { }
    help() {
        return {
            embed: {
            title: ".vibecheck",
            color: 5139196,
            description: "Brainlet will check your vibes to see if you pass or fail.",
            fields: [
              {
                name: "Usage:",
                value: ".vibecheck"
              }
            ]
          }
        };
    }
    async runCommand(args, msgObject, client) {
        //const canCheck = await this.canVibeCheck(msgObject);
        // if (!canCheck) {
        //     return;
        // }
        const vibe = Math.floor(Math.random() * 100);
        const voiceChannel = msgObject.member.voice.channel;
        if (vibe >= 85) {
            this.playsound(voiceChannel, client, true);
            const title = 'Brainlet approves of your vibes.';
            const desc = `${msgObject.member.user.username} vibes have been analyzed: ${vibe}% PASS :white_check_mark:`;
            const color = 0x71A324;
            this.generateMessage(client, msgObject, title, desc, color);
        }
        else if (vibe >= 50) {
            const title = 'Brainlet approves of your vibes.';
            const desc = `${msgObject.member.user.username} vibes have been analyzed: ${vibe}%, you have passed the vibe check. :thumbsup:`;
            const color = 0x71A324;
            this.generateMessage(client, msgObject, title, desc, color);
        }
        else if (vibe >= 15) {
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
            let sound = "";
                if(passed){
                    sound = "https://www.youtube.com/watch?v=04hXxI8TArU";
                }
                else {
                    sound = "https://www.youtube.com/watch?v=RxcHbiUfKlA";
                }
            voiceChannel.join().then(async (connection) => {
                const dispatcher = connection.play(await ytdl(sound), { type: 'opus' });
                dispatcher.on('error', err => {
                    console.log(`Error playing vibe check sound, requested on ${Date.now()} by ${msgObject.author.username}`);
                    console.log(err);
                    voiceChannel.leave();
                });
                dispatcher.on('finish', end => {
                    voiceChannel.leave();
                });
            });
        }
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
        let user = await Vibe.findOne({UserId: msgObject.author.id}).exec();
        let canCheck = true;
        if (user) {
            const timeDiff = Math.abs(new Date().valueOf() - user.LastCheck.valueOf());
            const hoursDiff = timeDiff / 36e5;
            if (hoursDiff < 8) {
                msgObject.reply(`You still got ${(8 - hoursDiff).toFixed(2)} hour(s) left.`);
                canCheck = false;
            }
            else {
                await Vibe.updateOne({ UserId: msgObject.author.id }, { LastCheck: new Date() });
            }
        }
        else {
            await Vibe({ UserId: msgObject.author.id, LastCheck: new Date() }).save();
        }
        mongoose.connection.close();
        return canCheck;
    };
}
exports.default = vibecheck;