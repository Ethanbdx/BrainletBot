"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigFile = require("../config");
class help {
    constructor() {
        this._command = "help";
    }
    help() {
        return "This command returns info on any requested command.";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        if (!args[0]) {
            msgObject.reply('Include a command you want info on, for example .help help');
        }
        if (args.length > 1) {
            msgObject.reply("Woah, one at a time there buddy!");
        }
        if ((ConfigFile.config.commands).includes(args[0])) {
            var helpMessage = this.getHelpMessage(args[0]);
            msgObject.reply(helpMessage);
        }
    }
    getHelpMessage(commandName) {
        const commandClass = require(`./${commandName}`).default;
        const command = new commandClass();
        return command.help();
    }
}
exports.default = help;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsd0NBQXVDO0FBRXZDLE1BQXFCLElBQUk7SUFBekI7UUFFcUIsYUFBUSxHQUFHLE1BQU0sQ0FBQTtJQXlCdEMsQ0FBQztJQXZCRyxJQUFJO1FBQ0EsT0FBTyxxREFBcUQsQ0FBQztJQUNqRSxDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCO1FBQ3pFLElBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUM7WUFDUixTQUFTLENBQUMsS0FBSyxDQUFDLDREQUE0RCxDQUFDLENBQUM7U0FDakY7UUFDRCxJQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO1lBQ2YsU0FBUyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsSUFBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO1lBQzlDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDOUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTtTQUMvQjtJQUNMLENBQUM7SUFDRCxjQUFjLENBQUMsV0FBbUI7UUFDOUIsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssV0FBVyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUE7UUFDeEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDbEQsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztDQUNKO0FBM0JELHVCQTJCQyJ9