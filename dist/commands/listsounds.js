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
const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../brainletDB.db'
});
const Sounds = sequelize.define('Sounds', {
    Name: {
        type: Sequelize.STRING,
        unique: true,
    },
    Url: Sequelize.STRING,
    CreatedBy: Sequelize.STRING
});
class listsounds {
    constructor() {
        this._command = "listsounds";
    }
    help() {
        return "Brainlet will tell you all he knows how to say.";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const soundList = yield Sounds.findAll({
                attributes: ['Name'],
            });
            const soundString = soundList.map(s => s.Name).sort(() => Math.random() - 0.5).join(', ').slice(0, 2048) || 'There are no sounds currently set!';
            const embed = new Discord.RichEmbed()
                .setTitle('Available Sounds:')
                .setDescription(`${soundString}`)
                .setColor(0x2471a3)
                .setFooter('To add sounds, type \'.addsound [sound name] [youtube url]\'');
            return msgObject.reply({
                embed,
            });
        });
    }
}
exports.default = listsounds;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdHNvdW5kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9saXN0c291bmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXFDO0FBRXJDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdkMsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUM7SUFDNUIsT0FBTyxFQUFFLFFBQVE7SUFDakIsT0FBTyxFQUFFLGtCQUFrQjtDQUM5QixDQUFDLENBQUM7QUFDSCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtJQUN0QyxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU07UUFDdEIsTUFBTSxFQUFFLElBQUk7S0FDZjtJQUNELEdBQUcsRUFBRSxTQUFTLENBQUMsTUFBTTtJQUNyQixTQUFTLEVBQUUsU0FBUyxDQUFDLE1BQU07Q0FDOUIsQ0FBQyxDQUFDO0FBRUgsTUFBcUIsVUFBVTtJQUEvQjtRQUVxQixhQUFRLEdBQUcsWUFBWSxDQUFDO0lBc0I3QyxDQUFDO0lBcEJHLElBQUk7UUFDQSxPQUFPLGlEQUFpRCxDQUFDO0lBQzdELENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFDSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQ2hGLE1BQU0sU0FBUyxHQUFHLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDbkMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDO2FBQ3ZCLENBQUMsQ0FBQztZQUNILE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxvQ0FBb0MsQ0FBQztZQUNqSixNQUFNLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7aUJBQ2xDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDN0IsY0FBYyxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUM7aUJBQ2hDLFFBQVEsQ0FBQyxRQUFRLENBQUM7aUJBQ2xCLFNBQVMsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1lBQzdFLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQztnQkFDckIsS0FBSzthQUNOLENBQUMsQ0FBQztRQUNOLENBQUM7S0FBQTtDQUNKO0FBeEJELDZCQXdCQyJ9