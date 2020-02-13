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
                const streamSettings = {
                    seek: 0,
                    volume: 1,
                };
                const stream = ytdl(sound.Url, {
                    fliter: 'audioonly',
                });
                voiceChannel.join().then(connection => {
                    const dispatcher = connection.playStream(stream, streamSettings);
                    dispatcher.on('error', err => {
                        msgObject.reply(`Something went wrong while playing ${soundName}.`);
                    });
                    dispatcher.on('end', end => {
                        voiceChannel.leave();
                    });
                });
                msgObject.reply(`Now playing ${soundName}.`);
                return;
            }
            msgObject.reply(`I couldn't find ${soundName} in my database, maybe you should add it or use .listsounds to see all the available sounds.`);
        });
    }
}
exports.default = playsound;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheXNvdW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3BsYXlzb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdkMsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUM7SUFDNUIsT0FBTyxFQUFFLFFBQVE7SUFDakIsT0FBTyxFQUFFLGVBQWU7Q0FDM0IsQ0FBQyxDQUFDO0FBRUgsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7SUFDdEMsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3RCLE1BQU0sRUFBRSxJQUFJO0tBQ2Y7SUFDRCxHQUFHLEVBQUUsU0FBUyxDQUFDLE1BQU07SUFDckIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxNQUFNO0NBQzlCLENBQUMsQ0FBQztBQUVILE1BQXFCLFNBQVM7SUFBOUI7UUFFcUIsYUFBUSxHQUFHLFdBQVcsQ0FBQztJQWtENUMsQ0FBQztJQWhERyxJQUFJO1FBQ0EsT0FBTyw0QkFBNEIsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0ssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUMvRSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUE7WUFDdEIsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDbkQsSUFBRyxDQUFDLFNBQVMsRUFBQztnQkFDVixTQUFTLENBQUMsS0FBSyxDQUFDLGlFQUFpRSxDQUFDLENBQUE7Z0JBQ2xGLE9BQU87YUFDVjtZQUNELElBQUcsQ0FBQyxZQUFZLEVBQUM7Z0JBQ2IsU0FBUyxDQUFDLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFBO2dCQUN6RSxPQUFPO2FBQ1Y7WUFDRCxJQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO2dCQUNsQyxTQUFTLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7Z0JBQ3BDLE9BQU87YUFDVjtZQUNELE1BQU0sS0FBSyxHQUFHLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDL0IsS0FBSyxFQUFFO29CQUNILElBQUksRUFBRSxTQUFTO2lCQUNsQjthQUNKLENBQUMsQ0FBQztZQUNILElBQUcsS0FBSyxFQUFDO2dCQUNMLE1BQU0sY0FBYyxHQUFHO29CQUNuQixJQUFJLEVBQUUsQ0FBQztvQkFDUCxNQUFNLEVBQUUsQ0FBQztpQkFDWixDQUFDO2dCQUNGLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO29CQUMzQixNQUFNLEVBQUUsV0FBVztpQkFDdEIsQ0FBQyxDQUFDO2dCQUNILFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ2xDLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUNqRSxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTt3QkFDekIsU0FBUyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsU0FBUyxHQUFHLENBQUMsQ0FBQTtvQkFDdkUsQ0FBQyxDQUFDLENBQUE7b0JBQ0YsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7d0JBQ3ZCLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDekIsQ0FBQyxDQUFDLENBQUE7Z0JBQ04sQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQzdDLE9BQU87YUFDVjtZQUNELFNBQVMsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLFNBQVMsOEZBQThGLENBQUMsQ0FBQTtRQUMvSSxDQUFDO0tBQUE7Q0FDSjtBQXBERCw0QkFvREMifQ==