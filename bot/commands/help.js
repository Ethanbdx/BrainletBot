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