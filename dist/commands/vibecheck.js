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
        if (vibe > 85) {
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
exports.default = vibecheck;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmliZWNoZWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3ZpYmVjaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRzFDLE1BQXFCLFNBQVM7SUFBOUI7UUFFcUIsYUFBUSxHQUFHLFdBQVcsQ0FBQztJQWdJNUMsQ0FBQztJQTlIRyxJQUFJO1FBQ0EsT0FBTyxnQ0FBZ0MsQ0FBQTtJQUMzQyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUNuQyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCO1FBQ3pFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ25ELElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRTtZQUNYLElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7Z0JBQzVFLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBTSxVQUFVLEVBQUMsRUFBRTtvQkFDeEMsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDLENBQUM7b0JBRXhHLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFO3dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sU0FBUyxD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