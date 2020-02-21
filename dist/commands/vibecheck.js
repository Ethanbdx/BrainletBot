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
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../brainletDB.db'
});
const Vibes = sequelize.define('Vibes', {
    UserId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    LastCheck: {
        type: Sequelize.DATE,
        allowNull: false
    }
});
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
        return __awaiter(this, void 0, void 0, function* () {
            const canCheck = yield this.canVibeCheck(msgObject);
            if (!canCheck) {
                return;
            }
            const vibe = Math.floor(Math.random() * 100);
            const voiceChannel = msgObject.member.voiceChannel;
            const discordUser = msgObject.author.id;
            if (vibe > 85) {
                if (voiceChannel && voiceChannel.joinable && client.voiceConnections.size == 0) {
                    voiceChannel.join().then((connection) => __awaiter(this, void 0, void 0, function* () {
                        const dispatcher = connection.playOpusStream(yield ytdl("https://www.youtube.com/watch?v=04hXxI8TArU"));
                        dispatcher.on('err', err => {
                            console.log(`Error playing vibe check passed, requested on ${Date.now()} by ${msgObject.author.username}`);
                            console.log(err);
                        });
                        dispatcher.on('end', end => {
                            voiceChannel.leave();
                        });
                    }));
                }
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
                if (voiceChannel && voiceChannel.joinable && client.voiceConnections.size == 0) {
                    voiceChannel.join().then((connection) => __awaiter(this, void 0, void 0, function* () {
                        const dispatcher = connection.playOpusStream(yield ytdl("https://www.youtube.com/watch?v=RxcHbiUfKlA"));
                        dispatcher.on('err', err => {
                            console.log(`Error playing vibe check failed, requested on ${Date.now()} by ${msgObject.author.username}`);
                            console.log(err);
                        });
                        dispatcher.on('end', end => {
                            voiceChannel.leave();
                        });
                    }));
                }
                const title = 'Brainlet disapproves of your vibes.';
                const desc = `${msgObject.member.user.username} vibes have been analyzed: ${vibe}% FAIL :x:`;
                const color = 0xA32432;
                this.generateMessage(client, msgObject, title, desc, color);
            }
        });
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
    canVibeCheck(msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const vibe = yield Vibes.findOne({
                where: {
                    UserId: msgObject.author.id
                }
            });
            if (vibe) {
                const timeDiff = Math.abs(new Date().valueOf() - vibe.LastCheck.valueOf());
                const hoursDiff = timeDiff / 36e5;
                console.log(hoursDiff);
                if (hoursDiff < 8) {
                    msgObject.reply(`You still got ${(8 - hoursDiff).toFixed(2)} hour(s) left.`);
                    return false;
                }
                else {
                    Vibes.update({ LastCheck: new Date() }, {
                        where: {
                            UserId: msgObject.author.id
                        }
                    });
                    return true;
                }
            }
            else {
                Vibes.create({
                    UserId: msgObject.author.id,
                    LastCheck: new Date()
                });
                return true;
            }
        });
    }
}
exports.default = vibecheck;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmliZWNoZWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3ZpYmVjaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzFDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN2QyxNQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQztJQUM1QixPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsa0JBQWtCO0NBQzlCLENBQUMsQ0FBQztBQUVILE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO0lBQ3BDLE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixNQUFNLEVBQUUsSUFBSTtRQUNaLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxJQUFJO0tBQ25CO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO1FBQ3BCLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0NBQ0osQ0FBQyxDQUFBO0FBRUYsTUFBcUIsU0FBUztJQUE5QjtRQUdxQixhQUFRLEdBQUcsV0FBVyxDQUFDO0lBK0g1QyxDQUFDO0lBN0hHLElBQUk7UUFDQSxPQUFPLGdDQUFnQyxDQUFBO0lBQzNDLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFBO0lBQ25DLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQy9FLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwRCxJQUFHLENBQUMsUUFBUSxFQUFFO2dCQUNWLE9BQU87YUFDVjtZQUNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1lBQ25ELE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3hDLElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRTtnQkFDWCxJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO29CQUM1RSxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQU0sVUFBVSxFQUFDLEVBQUU7d0JBQ3hDLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsNkNBQTZDLENBQUMsQ0FBQyxDQUFDO3dCQUV4RyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRTs0QkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTs0QkFDMUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckIsQ0FBQyxDQUFDLENBQUE7d0JBRUYsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7NEJBQ3ZCLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDekIsQ0FBQyxDQUFDLENBQUE7b0JBQ04sQ0FBQyxDQUFBLENBQUMsQ0FBQTtpQkFDTDtnQkFDRCxNQUFNLEtBQUssR0FBRyxrQ0FBa0MsQ0FBQztnQkFDakQsTUFBTSxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLDhCQUE4QixJQUFJLDJCQUEyQixDQUFBO2dCQUMzRyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUE7Z0JBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO2FBQzlEO2lCQUNJLElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRTtnQkFDaEIsTUFBTSxLQUFLLEdBQUcsa0NBQWtDLENBQUM7Z0JBQ2pELE1BQU0sSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSw4QkFBOEIsSUFBSSwrQ0FBK0MsQ0FBQztnQkFDaEksTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFBO2dCQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTthQUM5RDtpQkFDSSxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU0sS0FBSyxHQUFHLHNDQUFzQyxDQUFDO2dCQUNyRCxNQUFNLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsOEJBQThCLElBQUksaURBQWlELENBQUM7Z0JBQ2xJLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7YUFDOUQ7aUJBQ0k7Z0JBQ0QsSUFBSSxZQUFZLElBQUksWUFBWSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtvQkFDNUUsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFNLFVBQVUsRUFBQyxFQUFFO3dCQUN4QyxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxDQUFDLDZDQUE2QyxDQUFDLENBQUMsQ0FBQzt3QkFFeEcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7NEJBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaURBQWlELElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7NEJBQzFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JCLENBQUMsQ0FBQyxDQUFBO3dCQUVGLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFOzRCQUN2QixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ3pCLENBQUMsQ0FBQyxDQUFBO29CQUNOLENBQUMsQ0FBQSxDQUFDLENBQUE7aUJBQ0w7Z0JBQ0QsTUFBTSxLQUFLLEdBQUcscUNBQXFDLENBQUM7Z0JBQ3BELE1BQU0sSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSw4QkFBOEIsSUFBSSxZQUFZLENBQUM7Z0JBQzdGLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDL0Q7UUFFTCxDQUFDO0tBQUE7SUFFRCxlQUFlLENBQUMsTUFBc0IsRUFBRSxTQUEwQixFQUFFLEtBQWEsRUFBRSxJQUFZLEVBQUUsS0FBYTtRQUMxRyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNuQixLQUFLLEVBQUU7Z0JBQ0gsTUFBTSxFQUFFO29CQUNKLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVE7b0JBQzFCLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7aUJBQ2xDO2dCQUNELEtBQUssRUFBRSxLQUFLO2dCQUNaLFNBQVMsRUFBRTtvQkFDUCxHQUFHLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTO2lCQUNsQztnQkFDRCxXQUFXLEVBQUUsSUFBSTtnQkFDakIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO2dCQUNyQixNQUFNLEVBQUU7b0JBQ0osUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztpQkFDbEM7YUFDSjtTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFSyxZQUFZLENBQUMsU0FBMEI7O1lBRTFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDNUIsS0FBSyxFQUFFO29CQUNILE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7aUJBQzlCO2FBQ0osQ0FBQyxDQUFBO1lBRUYsSUFBRyxJQUFJLEVBQUU7Z0JBQ0wsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDM0UsTUFBTSxTQUFTLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQTtnQkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkIsSUFBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFO29CQUNkLFNBQVMsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDN0UsT0FBTyxLQUFLLENBQUE7aUJBQ2Y7cUJBQ0k7b0JBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFDLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRSxFQUFDLEVBQUU7d0JBQ2xDLEtBQUssRUFBRTs0QkFDSCxNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO3lCQUM5QjtxQkFDSixDQUFDLENBQUM7b0JBQ0gsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7YUFDSjtpQkFDSTtnQkFDRCxLQUFLLENBQUMsTUFBTSxDQUFDO29CQUNULE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQzNCLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtpQkFDeEIsQ0FBQyxDQUFDO2dCQUNILE9BQU8sSUFBSSxDQUFDO2FBQ2Y7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQWxJRCw0QkFrSUMifQ==