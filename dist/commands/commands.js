"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configFile = require("../config");
class commands {
    constructor() {
        this._command = "commands";
    }
    help() {
        return "Brainlet will tell you all he is capable of.";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        var commandList = [];
        for (let index = 0; index < configFile.config.commands.length; index++) {
            var command = " " + configFile.config.commands[index];
            commandList.push(command);
        }
        msgObject.channel.send(`Here is all my smol brain is capable of: \n${commandList} \n For more info, use .help [command]`);
    }
}
exports.default = commands;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvY29tbWFuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSx3Q0FBdUM7QUFFdkMsTUFBcUIsUUFBUTtJQUE3QjtRQUVxQixhQUFRLEdBQUcsVUFBVSxDQUFDO0lBZ0IzQyxDQUFDO0lBZEcsSUFBSTtRQUNBLE9BQU8sOENBQThDLENBQUM7SUFDMUQsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNELFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjtRQUN6RSxJQUFJLFdBQVcsR0FBYyxFQUFFLENBQUE7UUFDL0IsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNwRSxJQUFJLE9BQU8sR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEQsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUM1QjtRQUNGLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDhDQUE4QyxXQUFXLHdDQUF3QyxDQUFDLENBQUE7SUFDNUgsQ0FBQztDQUNKO0FBbEJELDJCQWtCQyJ9