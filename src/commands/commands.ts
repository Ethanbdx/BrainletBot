import * as Discord from "discord.js"
import {IBotCommand} from "../api"
import * as configFile from "../config"

export default class commands implements IBotCommand{

    private readonly _command = "commands";

    help(): string {
        return "Brainlet will tell you all he is capable of.";
    }    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
        var commandList : string[] = []
        for (let index = 0; index < configFile.config.commands.length; index++) {
            var command = " " + configFile.config.commands[index];
            commandList.push(command)
        }
       msgObject.channel.send(`Here is all my smol brain is capable of: \n${commandList} \n For more info, use .help [command]`)
    }
}