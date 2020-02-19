import * as Discord from "discord.js"
import { IBotCommand } from "../api"
import { stringify } from "querystring";
const ytdl = require('ytdl-core-discord');


export default class vibecheck implements IBotCommand {

    
    private readonly _command = "vibecheck";

    help(): string {
        return "Brainlet will check your vibe."
    }

    isThisCommand(command: string): boolean {
        return command == this._command
    }

    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
        const vibe = Math.floor(Math.random() * 100);
        const voiceChannel = msgObject.member.voiceChannel;
        const discordUser = msgObject.author.id;
        if (vibe > 85) {
            if (voiceChannel && voiceChannel.joinable && client.voiceConnections.size == 0) {
                voiceChannel.join().then(async connection => {
                    const dispatcher = connection.playOpusStream(await ytdl("https://www.youtube.com/watch?v=F0D1xwn0Kyc"));

                    dispatcher.on('err', err => {
                        console.log(`Error playing vibe check passed, requested on ${Date.now()} by ${msgObject.author.username}`)
                        console.log(err);
                    })

                    dispatcher.on('end', end => {
                        voiceChannel.leave();
                    })
                })
            }
            const title = 'Brainlet approves of your vibes.';
            const desc = `${msgObject.member.user.username} vibes have been analyzed: ${vibe}% PASS :white_check_mark:`
            const color = 0x71A324
            this.generateMessage(client, msgObject, title, desc, color)
        }
        else if (vibe > 50) {
            const title = 'Brainlet approves of your vibes.';
            const desc = `${msgObject.member.user.username} vibes have been analyzed: ${vibe}%, you have passed the vibe check. :thumbsup:`;
            const color = 0x71A324
            this.generateMessage(client, msgObject, title, desc, color)
        }
        else if (vibe > 15) {
            const title = 'Brainlet dissapproves of your vibes.';
            const desc = `${msgObject.member.user.username} vibes have been analyzed: ${vibe}%, you have failed the vibe check. :thumbsdown:`;
            const color = 0xA32432;
            this.generateMessage(client, msgObject, title, desc, color)
        }
        else {
            if (voiceChannel && voiceChannel.joinable && client.voiceConnections.size == 0) {
                voiceChannel.join().then(async connection => {
                    const dispatcher = connection.playOpusStream(await ytdl("https://www.youtube.com/watch?v=QKfkMqqNwWg"));

                    dispatcher.on('err', err => {
                        console.log(`Error playing vibe check failed, requested on ${Date.now()} by ${msgObject.author.username}`)
                        console.log(err);
                    })

                    dispatcher.on('end', end => {
                        voiceChannel.leave();
                    })
                })
            }
            const title = 'Brainlet disapproves of your vibes.';
            const desc = `${msgObject.member.user.username} vibes have been analyzed: ${vibe}% FAIL :x:`;
            const color = 0xA32432;
            this.generateMessage(client, msgObject, title, desc, color);
        }

    }

    generateMessage(client: Discord.Client, msgObject: Discord.Message, title: string, desc: string, color: number): void{
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
        })
    }

    canVibeCheck(vibeMap: Map<string, Date>, discordUser: Discord.User): boolean {
        //If user is not mapped.
        if(!vibeMap.has(discordUser.id)) {
           vibeMap.set(discordUser.id, new Date())
           return true;
        }

        //Has 8 hours passed since last check?
        const lastTimeChecked = vibeMap.get(discordUser.id)
        const currentTime = new Date();
        const hourDiff = Math.abs((currentTime.valueOf() - lastTimeChecked!.valueOf())/3.6e6)
        if(hourDiff < 8) {
            return false;
        }
        else {
            vibeMap.set(discordUser.id, new Date());
            return true;
        }
    }

}