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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdHNvdW5kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9saXN0c291bmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXFDO0FBRXJDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdkMsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUM7SUFDNUIsT0FBTyxFQUFFLFFBQVE7SUFDakIsT0FBTyxFQUFFLGVBQWU7Q0FDM0IsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7SUFDdEMsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3RCLE1BQU0sRUFBRSxJQUFJO0tBQ2Y7SUFDRCxHQUFHLEVBQUUsU0FBUyxDQUFDLE1BQU07SUFDckIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxNQUFNO0NBQzlCLENBQUMsQ0FBQztBQUVILE1BQXFCLFVBQVU7SUFBL0I7UUFFcUIsYUFBUSxHQUFHLFlBQVksQ0FBQztJQXNCN0MsQ0FBQztJQXBCRyxJQUFJO1FBQ0EsT0FBTyxpREFBaUQsQ0FBQztJQUM3RCxDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0ssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUNoRixNQUFNLFNBQVMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQ25DLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQzthQUN2QixDQUFDLENBQUM7WUFDSCxNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksb0NBQW9DLENBQUM7WUFDakosTUFBTSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2lCQUNsQyxRQUFRLENBQUMsbUJBQW1CLENBQUM7aUJBQzdCLGNBQWMsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDO2lCQUNoQyxRQUFRLENBQUMsUUFBUSxDQUFDO2lCQUNsQixTQUFTLENBQUMsOERBQThELENBQUMsQ0FBQztZQUM3RSxPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3JCLEtBQUs7YUFDTixDQUFDLENBQUM7UUFDTixDQUFDO0tBQUE7Q0FDSjtBQXhCRCw2QkF3QkMifQ==