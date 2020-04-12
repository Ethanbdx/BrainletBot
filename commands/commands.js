const fs = require('fs');

class commands {
    constructor() { 
        this.commandList = this.getCommands();
    }
    help() {
        return {
            embed: {
              title: ".commands",
              color: 5139196,
              description: "A list of all the available Brainlet commands.",
              fields: [
                {
                  name: "Usage:",
                  value: ".commands"
                }
              ]
            }
          };
    }
    runCommand(args, msgObject, client) {
        msgObject.channel.send({
            embed: {
              title: "Brainlet Command List",
              color: 5139196,
              footer: {
                text: "For more info on a command use .help [command]"
              },
              description: `${this.commandList}`
            }
          });
    }
    getCommands() {
        const commandList = []
        const commandsPath = "./commands/"
        fs.readdirSync(commandsPath).forEach(file => {
            const commandName = file.replace(".js", "")
            if(commandList.length == 0) {
                commandList.push(commandName);
            }
            else {
                commandList.push(" " + commandName);
            }
        });
        return commandList
    }
}
exports.default = commands;