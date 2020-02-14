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
class playsound {
    constructor() {
        this._command = "playsound";
    }
    help() {
        return "Brainlet does the talking.";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const soundName = args;
            const voiceChannel = msgObject.member.voiceChannel;
            if (!soundName) {
                msgObject.reply("You need to enter a sound to play, using .playsound [soundname]");
                return;
            }
            if (!voiceChannel) {
                msgObject.reply("You need to be in a voice channel to use this command.");
                return;
            }
            if (client.voiceConnections.size != 0) {
                msgObject.reply("I'm not done yet!");
                return;
            }
            const sound = yield Sounds.findOne({
                where: {
                    Name: soundName,
                }
            });
            if (sound) {
                voiceChannel.join().then((connection) => __awaiter(this, void 0, void 0, function* () {
                    const dispatcher = connection.playOpusStream(yield ytdl(sound.Url));
                    dispatcher.on('error', err => {
                        msgObject.reply(`Something went wrong while playing ${soundName}`);
                    });
                    dispatcher.on('end', end => {
                        voiceChannel.leave();
                    });
                }));
                msgObject.reply(`Now playing ${soundName}.`);
                return;
            }
            msgObject.reply(`I couldn't find ${soundName} in my database, maybe you should add it or use .listsounds to see all the available sounds.`);
        });
    }
}
exports.default = playsound;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheXNvdW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3BsYXlzb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzFDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN2QyxNQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQztJQUM1QixPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsZUFBZTtDQUMzQixDQUFDLENBQUM7QUFFSCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtJQUN0QyxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU07UUFDdEIsTUFBTSxFQUFFLElBQUk7S0FDZjtJQUNELEdBQUcsRUFBRSxTQUFTLENBQUMsTUFBTTtJQUNyQixTQUFTLEVBQUUsU0FBUyxDQUFDLE1BQU07Q0FDOUIsQ0FBQyxDQUFDO0FBRUgsTUFBcUIsU0FBUztJQUE5QjtRQUVxQixhQUFRLEdBQUcsV0FBVyxDQUFDO0lBK0M1QyxDQUFDO0lBN0NHLElBQUk7UUFDQSxPQUFPLDRCQUE0QixDQUFDO0lBQ3hDLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFDSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQy9FLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQTtZQUN0QixNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUNuRCxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNaLFNBQVMsQ0FBQyxLQUFLLENBQUMsaUVBQWlFLENBQUMsQ0FBQTtnQkFDbEYsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDZixTQUFTLENBQUMsS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUE7Z0JBQ3pFLE9BQU87YUFDVjtZQUNELElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7Z0JBQ25DLFNBQVMsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtnQkFDcEMsT0FBTzthQUNWO1lBQ0QsTUFBTSxLQUFLLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUMvQixLQUFLLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLFNBQVM7aUJBQ2xCO2FBQ0osQ0FBQyxDQUFDO1lBQ0gsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFNLFVBQVUsRUFBQyxFQUFFO29CQUN6QyxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUVwRSxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTt3QkFDekIsU0FBUyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsU0FBUyxFQUFFLENBQUMsQ0FBQTtvQkFDdEUsQ0FBQyxDQUFDLENBQUE7b0JBRUYsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7d0JBQ3ZCLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDekIsQ0FBQyxDQUFDLENBQUE7Z0JBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQTtnQkFFRixTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFFN0MsT0FBTzthQUNWO1lBQ0QsU0FBUyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsU0FBUyw4RkFBOEYsQ0FBQyxDQUFBO1FBQy9JLENBQUM7S0FBQTtDQUNKO0FBakRELDRCQWlEQyJ9