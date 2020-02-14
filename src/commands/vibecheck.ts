import * as Discord from "discord.js"
import { IBotCommand } from "../api"
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
        if (vibe > 80) {
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
            msgObject.channel.send({
                embed: {
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: 'Brainlet approves of your vibes.',
                    thumbnail: {
                        url: msgObject.author.avatarURL
                    },
                    description: `${msgObject.member.user.username} vibes have been analyzed: ${vibe}% PASS :white_check_mark:`,
                    color: 0x71A324,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL
                    }
                }
            })
        }
        else if (vibe > 50) {
            msgObject.channel.send({
                embed: {
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: 'Brainlet approves of your vibes.',
                    thumbnail: {
                        url: msgObject.author.avatarURL
                    },
                    description: `${msgObject.member.user.username} vibes have been analyzed: ${vibe}%, you have passed the vibe check. :thumbsup:`,
                    color: 0x71A324,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL
                    }

                }
            })
        }
        else if (vibe > 15) {
            msgObject.channel.send({
                embed: {
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: 'Brainlet dissapproves of your vibes.',
                    thumbnail: {
                        url: msgObject.author.avatarURL
                    },
                    description: `${msgObject.member.user.username} vibes have been analyzed: ${vibe}%, you have failed the vibe check. :thumbsdown:`,
                    color: 0xA32432,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL
                    }

                }
            })
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
            msgObject.channel.send({
                embed: {
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: 'Brainlet disapproves of your vibes.',
                    thumbnail: {
                        url: msgObject.author.avatarURL
                    },
                    description: `${msgObject.member.user.username} vibes have been analyzed: ${vibe}% FAIL :x:`,
                    color: 0xA32432,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL
                    }
                }
            })

        }

    }


}