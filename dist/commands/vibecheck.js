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
            const canCheck = yield this.canVibeCheck(msgObject.author.id);
            if (!canCheck) {
                msgObject.reply("It hasn't even been 8 hours yet...");
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
    canVibeCheck(discordUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const vibe = yield Vibes.findOne({
                where: {
                    UserId: discordUserId
                }
            });
            if (vibe) {
                const timeDiff = Math.abs(new Date().valueOf() - vibe.LastCheck.valueOf());
                const hoursDiff = timeDiff / 36e5;
                console.log(hoursDiff);
                if (hoursDiff < 8) {
                    return false;
                }
                else {
                    Vibes.update({ LastCheck: new Date() }, {
                        where: {
                            UserId: discordUserId
                        }
                    });
                    return true;
                }
            }
            else {
                Vibes.create({
                    UserId: discordUserId,
                    LastCheck: new Date()
                });
                return true;
            }
        });
    }
}
exports.default = vibecheck;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmliZWNoZWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3ZpYmVjaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzFDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN2QyxNQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQztJQUM1QixPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsa0JBQWtCO0NBQzlCLENBQUMsQ0FBQztBQUVILE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO0lBQ3BDLE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixNQUFNLEVBQUUsSUFBSTtRQUNaLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFVBQVUsRUFBRSxJQUFJO0tBQ25CO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO1FBQ3BCLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0NBQ0osQ0FBQyxDQUFBO0FBRUYsTUFBcUIsU0FBUztJQUE5QjtRQUdxQixhQUFRLEdBQUcsV0FBVyxDQUFDO0lBK0g1QyxDQUFDO0lBN0hHLElBQUk7UUFDQSxPQUFPLGdDQUFnQyxDQUFBO0lBQzNDLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFBO0lBQ25DLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQy9FLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzlELElBQUcsQ0FBQyxRQUFRLEVBQUU7Z0JB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