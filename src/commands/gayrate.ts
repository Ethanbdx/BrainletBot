import * as Discord from "discord.js"
import {IBotCommand} from "../api"

export default class gayrate implements IBotCommand{

    private readonly _command = "gayrate";

    help(): string {
        return "Brainlet will determine how gay you are.";
    }    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
       const randomNum = Math.floor(Math.random() * 100)
       msgObject.channel.send({
           embed: {
               author: {
                   name: client.user.username,
                   icon_url: client.user.avatarURL
               },
               title: 'Thinking....hmm..',
               thumbnail: {
                   url: msgObject.author.avatarURL
               },
               description: `${msgObject.member.user.username} is ${randomNum}% homosexual! :kiss_mm:`,
               color: 0x2471a3,
               timestamp: new Date(),
               footer: {
                    icon_url: client.user.avatarURL
               }

           }
       })
    }
}