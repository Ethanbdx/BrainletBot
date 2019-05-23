import * as Discord from "discord.js"
import {IBotCommand} from "../api"
import * as ConfigFile from "../config"

export default class help implements IBotCommand{

    private readonly _command = "help"

    help(): string {
        return "This command returns info on any requested command.";
    }    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
        if(!args[0]){
            msgObject.reply('Include a command you want info on, for example .help help');
        }
        if(args.length > 1){
            msgObject.reply("Woah, one at a time there buddy!");
        }
        if((ConfigFile.config.commands).includes(args[0])){
            var helpMessage = this.getHelpMessage(args[0])
            msgObject.reply(helpMessage)
        }
    }
    getHelpMessage(commandName: string): string{
        const commandClass = require(`./${commandName}`).default
        const command = new commandClass() as IBotCommand;
        return command.help();
    }
}