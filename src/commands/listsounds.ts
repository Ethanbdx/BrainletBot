import * as Discord from "discord.js"
import {IBotCommand} from "../api"
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

export default class listsounds implements IBotCommand{

    private readonly _command = "listsounds";

    help(): string {
        return "Brainlet will tell you all he knows how to say.";
    }    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client){
       const soundList = await Sounds.findAll({
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
    } 
}