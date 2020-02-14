"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ytdl = require('ytdl-core-discord');
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
    runCommand(args, msgObject, client) {
        const vibe = Math.floor(Math.random() * 100);
        const voiceChannel = msgObject.member.voiceChannel;
        if (vibe > 80) {
            if (voiceChannel && voiceChannel.joinable && client.voiceConnections.size == 0) {
                voiceChannel.join().then((connection) => __awaiter(this, void 0, void 0, function* () {
                    const dispatcher = connection.playOpusStream(yield ytdl("https://www.youtube.com/watch?v=F0D1xwn0Kyc"));
                    dispatcher.on('err', err => {
                        console.log(`Error playing vibe check passed, requested on ${Date.now()} by ${msgObject.author.username}`);
                        console.log(err);
                    });
                    dispatcher.on('end', end => {
                        voiceChannel.leave();
                    });
                }));
            }
            else {
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
                });
            }
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
            });
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
            });
        }
        else {
            if (voiceChannel && voiceChannel.joinable && client.voiceConnections.size == 0) {
                voiceChannel.join().then((connection) => __awaiter(this, void 0, void 0, function* () {
                    const dispatcher = connection.playOpusStream(yield ytdl("https://www.youtube.com/watch?v=QKfkMqqNwWg"));
                    dispatcher.on('err', err => {
                        console.log(`Error playing vibe check failed, requested on ${Date.now()} by ${msgObject.author.username}`);
                        console.log(err);
                    });
                    dispatcher.on('end', end => {
                        voiceChannel.leave();
                    });
                }));
            }
            else {
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
                });
            }
        }
    }
}
exports.default = vibecheck;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmliZWNoZWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3ZpYmVjaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRzFDLE1BQXFCLFNBQVM7SUFBOUI7UUFFcUIsYUFBUSxHQUFHLFdBQVcsQ0FBQztJQWlJNUMsQ0FBQztJQS9IRyxJQUFJO1FBQ0EsT0FBTyxnQ0FBZ0MsQ0FBQTtJQUMzQyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUNuQyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCO1FBQ3pFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ25ELElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRTtZQUNYLElBQUcsWUFBWSxJQUFJLFlBQVksQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7Z0JBQzNFLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBTSxVQUFVLEVBQUMsRUFBRTtvQkFDeEMsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDLENBQUM7b0JBRXhHLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFO3dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sU0FBUyxD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