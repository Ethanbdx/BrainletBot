"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ytdl = require('ytdl-core');
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../soundDB.db'
});
const Sounds = sequelize.define('Sounds', {
    Name: {
        type: Sequelize.STRING,
        unique: true,
    },
    Url: Sequelize.STRING,
    CreatedBy: Sequelize.STRING
});
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
        ytdl.getInfo(soundUrl, (err, info) => __awaiter(this, void 0, void 0, function* () {
            if (info.length_seconds > 60) {
                msgObject.reply("You can't add sounds longer than 1 minute!");
                return;
            }
            try {
                const sound = yield Sounds.create({
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
        }));
    }
}
exports.default = addsound;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkc291bmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvYWRkc291bmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdkMsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUM7SUFDNUIsT0FBTyxFQUFFLFFBQVE7SUFDakIsT0FBTyxFQUFFLGVBQWU7Q0FDM0IsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7SUFDdEMsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3RCLE1BQU0sRUFBRSxJQUFJO0tBQ2Y7SUFDRCxHQUFHLEVBQUUsU0FBUyxDQUFDLE1BQU07SUFDckIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxNQUFNO0NBQzlCLENBQUMsQ0FBQztBQUVILE1BQXFCLFFBQVE7SUFBN0I7UUFFcUIsYUFBUSxHQUFHLFVBQVUsQ0FBQztJQThDM0MsQ0FBQztJQTVDRyxJQUFJO1FBQ0EsT0FBTyw2Q0FBNkMsQ0FBQztJQUN6RCxDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCO1FBQzFFLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDakIsU0FBUyxDQUFDLEtBQUssQ0FBQywrRUFBK0UsQ0FBQyxDQUFBO1lBQ2hHLE9BQU87U0FDVjtRQUNELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDekIsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNsQixJQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1lBQzNDLFNBQVMsQ0FBQyxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQTtZQUM5RCxPQUFPO1NBQ1I7UUFDRCxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxFQUFDO1lBQ3ZDLFNBQVMsQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtTQUMvQztRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQU8sR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3ZDLElBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLEVBQUM7Z0JBQ3hCLFNBQVMsQ0FBQyxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQTtnQkFDN0QsT0FBTzthQUNWO1lBQ0QsSUFBRztnQkFDQyxNQUFNLEtBQUssR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQzlCLElBQUksRUFBRSxTQUFTO29CQUNmLEdBQUcsRUFBRSxRQUFRO29CQUNiLFNBQVMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtpQkFDbkYsQ0FBQyxDQUFDO2dCQUNILFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFTLHNCQUFzQixDQUFDLENBQUM7Z0JBQ3BELE9BQU87YUFDVjtZQUFDLE9BQU0sQ0FBQyxFQUFDO2dCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ2QsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLGdDQUFnQyxFQUFFO29CQUM3QyxTQUFTLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7aUJBQ2pEO3FCQUNJO29CQUNELFNBQVMsQ0FBQyxLQUFLLENBQUMsaURBQWlELEdBQUcsS0FBSyxDQUFDLENBQUM7aUJBQzlFO2FBQ0Q7UUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztDQUNKO0FBaERELDJCQWdEQyJ9