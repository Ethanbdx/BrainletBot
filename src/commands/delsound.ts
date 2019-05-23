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

export default class delsound implements IBotCommand{

    private readonly _command = "delsound";

    help(): string {
        return "Brainlet will forget a given sound.";
    }    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client){
       const soundName = args;
        if(!soundName) {
           msgObject.reply("You need to enter a sound to delete!")
           return;
       }
       const rowCount = await Sounds.destroy({
           where: {
                Name: soundName,
            },
           });
        if(!rowCount){
            msgObject.reply("There is no sound by that name to delete.")
            return;
        }
        msgObject.reply(`${soundName} has been deleted.`)
    }
}