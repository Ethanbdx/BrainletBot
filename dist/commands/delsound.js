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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsc291bmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZGVsc291bmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDO0lBQzVCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE9BQU8sRUFBRSxlQUFlO0NBQzNCLENBQUMsQ0FBQztBQUNILE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO0lBQ3RDLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixNQUFNLEVBQUUsSUFBSTtLQUNmO0lBQ0QsR0FBRyxFQUFFLFNBQVMsQ0FBQyxNQUFNO0lBQ3JCLFNBQVMsRUFBRSxTQUFTLENBQUMsTUFBTTtDQUM5QixDQUFDLENBQUM7QUFFSCxNQUFxQixRQUFRO0lBQTdCO1FBRXFCLGFBQVEsR0FBRyxVQUFVLENBQUM7SUF5QjNDLENBQUM7SUF2QkcsSUFBSTtRQUNBLE9BQU8scUNBQXFDLENBQUM7SUFDakQsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDaEYsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUcsQ0FBQyxTQUFTLEVBQUU7Z0JBQ1osU0FBUyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFBO2dCQUN2RCxPQUFPO2FBQ1Y7WUFDRCxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQ2xDLEtBQUssRUFBRTtvQkFDRixJQUFJLEVBQUUsU0FBUztpQkFDbEI7YUFDRCxDQUFDLENBQUM7WUFDTixJQUFHLENBQUMsUUFBUSxFQUFDO2dCQUNULFNBQVMsQ0FBQyxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQTtnQkFDNUQsT0FBTzthQUNWO1lBQ0QsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLFNBQVMsb0JBQW9CLENBQUMsQ0FBQTtRQUNyRCxDQUFDO0tBQUE7Q0FDSjtBQTNCRCwyQkEyQkMifQ==