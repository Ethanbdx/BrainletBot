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
class delsound {
    constructor() {
        this._command = "delsound";
    }
    help() {
        return "Brainlet will forget a given sound.";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const soundName = args;
            if (!soundName) {
                msgObject.reply("You need to enter a sound to delete!");
                return;
            }
            const rowCount = yield Sounds.destroy({
                where: {
                    Name: soundName,
                },
            });
            if (!rowCount) {
                msgObject.reply("There is no sound by that name to delete.");
                return;
            }
            msgObject.reply(`${soundName} has been deleted.`);
        });
    }
}
exports.default = delsound;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsc291bmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZGVsc291bmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdkMsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUM7SUFDNUIsT0FBTyxFQUFFLFFBQVE7SUFDakIsT0FBTyxFQUFFLGVBQWU7Q0FDM0IsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7SUFDdEMsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3RCLE1BQU0sRUFBRSxJQUFJO0tBQ2Y7SUFDRCxHQUFHLEVBQUUsU0FBUyxDQUFDLE1BQU07SUFDckIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxNQUFNO0NBQzlCLENBQUMsQ0FBQztBQUVILE1BQXFCLFFBQVE7SUFBN0I7UUFFcUIsYUFBUSxHQUFHLFVBQVUsQ0FBQztJQXlCM0MsQ0FBQztJQXZCRyxJQUFJO1FBQ0EsT0FBTyxxQ0FBcUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0ssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUNoRixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBRyxDQUFDLFNBQVMsRUFBRTtnQkFDWixTQUFTLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUE7Z0JBQ3ZELE9BQU87YUFDVjtZQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDbEMsS0FBSyxFQUFFO29CQUNGLElBQUksRUFBRSxTQUFTO2lCQUNsQjthQUNELENBQUMsQ0FBQztZQUNOLElBQUcsQ0FBQyxRQUFRLEVBQUM7Z0JBQ1QsU0FBUyxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFBO2dCQUM1RCxPQUFPO2FBQ1Y7WUFDRCxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsU0FBUyxvQkFBb0IsQ0FBQyxDQUFBO1FBQ3JELENBQUM7S0FBQTtDQUNKO0FBM0JELDJCQTJCQyJ9