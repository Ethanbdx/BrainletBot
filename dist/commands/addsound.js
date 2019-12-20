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
            try {
                if (info.length_seconds > 60) {
                    msgObject.reply("You can't add sounds longer than 1 minute!");
                    return;
                }
            }
            catch (e) {
                console.log(e);
                if (e.name === 'UnhandledPromiseRejectionWarning') {
                    msgObject.reply("I am unable to read the length of this video >:(");
                    return;
                }
                else {
                    msgObject.reply("I don't know what...but something went wrong");
                    return;
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkc291bmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvYWRkc291bmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDO0lBQzVCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE9BQU8sRUFBRSxlQUFlO0NBQzNCLENBQUMsQ0FBQztBQUNILE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO0lBQ3RDLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixNQUFNLEVBQUUsSUFBSTtLQUNmO0lBQ0QsR0FBRyxFQUFFLFNBQVMsQ0FBQyxNQUFNO0lBQ3JCLFNBQVMsRUFBRSxTQUFTLENBQUMsTUFBTTtDQUM5QixDQUFDLENBQUM7QUFFSCxNQUFxQixRQUFRO0lBQTdCO1FBRXFCLGFBQVEsR0FBRyxVQUFVLENBQUM7SUF5RDNDLENBQUM7SUF2REcsSUFBSTtRQUNBLE9BQU8sNkNBQTZDLENBQUM7SUFDekQsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNELFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjtRQUMxRSxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ2pCLFNBQVMsQ0FBQyxLQUFLLENBQUMsK0VBQStFLENBQUMsQ0FBQTtZQUNoRyxPQUFPO1NBQ1Y7UUFDRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ3pCLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbEIsSUFBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRTtZQUMzQyxTQUFTLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUE7WUFDOUQsT0FBTztTQUNSO1FBQ0QsSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsRUFBQztZQUN2QyxTQUFTLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUE7U0FDL0M7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUN2QyxJQUFJO2dCQUNKLElBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLEVBQUM7b0JBQ3hCLFNBQVMsQ0FBQyxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQTtvQkFDN0QsT0FBTztpQkFDVjthQUNIO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDZCxJQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssa0NBQWtDLEVBQUU7b0JBQzlDLFNBQVMsQ0FBQyxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQTtvQkFDbkUsT0FBTztpQkFDVjtxQkFBTTtvQkFDSCxTQUFTLENBQUMsS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUE7b0JBQy9ELE9BQU87aUJBQ1Y7YUFDSjtZQUNFLElBQUc7Z0JBQ0MsTUFBTSxLQUFLLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDO29CQUM5QixJQUFJLEVBQUUsU0FBUztvQkFDZixHQUFHLEVBQUUsUUFBUTtvQkFDYixTQUFTLEVBQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7aUJBQ25GLENBQUMsQ0FBQztnQkFDSCxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsU0FBUyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUNwRCxPQUFPO2FBQ1Y7WUFBQyxPQUFNLENBQUMsRUFBQztnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNkLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxnQ0FBZ0MsRUFBRTtvQkFDN0MsU0FBUyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2lCQUNqRDtxQkFDSTtvQkFDRCxTQUFTLENBQUMsS0FBSyxDQUFDLGlEQUFpRCxHQUFHLEtBQUssQ0FBQyxDQUFDO2lCQUM5RTthQUNEO1FBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQTtJQUNMLENBQUM7Q0FDSjtBQTNERCwyQkEyREMifQ==