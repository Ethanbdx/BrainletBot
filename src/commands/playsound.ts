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

export default class playsound implements IBotCommand{

    private readonly _command = "playsound";

    help(): string {
        return "Brainlet does the talking.";
    }    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client) {
        const soundName = args
        const voiceChannel = msgObject.member.voiceChannel;
        if(!soundName){
            msgObject.reply("You need to enter a sound to play, using .playsound [soundname]")
            return;
        }
        if(!voiceChannel){
            msgObject.reply("You need to be in a voice channel to use this command.")
            return;
        }
        if(client.voiceConnections.size != 0) {
            msgObject.reply("I'm not done yet!")
            return;
        }
        const sound = await Sounds.findOne({
            where: {
                Name: soundName,
            }
        });
        if(sound){
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
                    msgObject.reply(`Something went wrong while playing ${soundName}.`)
                })
                dispatcher.on('end', end => {
                    voiceChannel.leave();
                })
            })
            msgObject.reply(`Now playing ${soundName}.`);
            return;
        }
        msgObject.reply(`I couldn't find ${soundName} in my database, maybe you should add it or use .listsounds to see all the available sounds.`)  
    }
}