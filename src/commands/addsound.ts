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

export default class addsound implements IBotCommand{

    private readonly _command = "addsound";

    help(): string {
        return "Brainlet will remeber a sound you give him.";
    }    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
       if(args.length != 2) {
           msgObject.reply("You need to include the same of sound and url, like so .addsound [name] [url]")
           return;
       }
       const soundName = args[0],
       soundUrl = args[1]
       if(!soundUrl.includes('youtube.com/watch?')) {
         msgObject.reply("That's an invalid YouTube Url! :dizzy_face:")
         return;
       }
       if(soundUrl.includes('playlist' || 'list')){
           msgObject.reply("You can't add a playlist!")
       }
       ytdl.getInfo(soundUrl, async (err, info) => {
           if(info.length_seconds > 60){
               msgObject.reply("You can't add sounds longer than 1 minute!")
               return;
           }
           try{
               const sound = await Sounds.create({
                   Name: soundName,
                   Url: soundUrl,
                   CreatedBy: `${msgObject.author.username}#${msgObject.member.user.discriminator}`
               });
               msgObject.reply(`${soundName} successfully added!`);
               return;
           } catch(e){
            console.log(e)
            if (e.name === 'SequelizeUniqueConstraintError') {
                msgObject.reply('That sound already exists!'); 
            } 
            else {
                msgObject.reply('Something went wrong while adding that sound...' + Error);
            }
           }
       })
    }
}