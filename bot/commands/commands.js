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