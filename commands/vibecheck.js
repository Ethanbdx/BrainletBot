import { getSoundAudioStream } from "../util/soundManager.js";
import vibeDatabase from '../util/vibeDatabase.js'

export default class vibecheck {
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
        const canCheck = await this.canVibeCheck(msgObject);
        if (!canCheck) {
            return;
        }
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

    async playsound(voiceChannel, client, passed) {
        if(voiceChannel && voiceChannel.joinable && client.voice.connections.size == 0) {
            let soundName = "";
                if(passed){
                    soundName = "vibePassed";
                }
                else {
                    soundName = "vibeFailed";
                }
            const connection = await voiceChannel.join();
            const dispatcher = connection.play(getSoundAudioStream(soundName));
            dispatcher.on('error', err => {
                console.log(err);
                connection.disconnect();
            });
            dispatcher.on('finish', end => {
                connection.disconnect();
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
        const userId = msgObject.author.id;
        const user = await vibeDatabase.getUser(userId)
        let canCheck = true;
        if (user) {
            const timeDiff = Math.abs(new Date().valueOf() - user.LastChecked.valueOf());
            const hoursDiff = timeDiff / 36e5;
            if (hoursDiff < 8) {
                msgObject.reply(`You still have ${(8 - hoursDiff).toFixed(2)} hour(s) until you can check your V I B E S.`);
                canCheck = false;
            }
            else {
                vibeDatabase.updateLastChecked(userId, new Date())
            }
        }
        else {
            vibeDatabase.addUser(userId)
        }
        return canCheck;
    };
}