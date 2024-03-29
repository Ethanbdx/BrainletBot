import fs from 'fs'

export default class help {
    constructor() {
        this.commandList = this.getCommands();
    }
    help() {
        return {
            embed: {
                title: ".help",
                color: 5139196,
                description: "Brainlet will show you how to use his commands.",
                fields: [
                    {
                        name: "Usage:",
                        value: ".help [command]"
                    },
                    {
                        name: "[command]",
                        value: "Any command you'd like to learn how to use."
                    }
                ]
            }
        };
    }
    async runCommand(args, msgObject, client) {
        if (!args[0]) {
            msgObject.reply('Include a command you want info on, for example .help help');
        }
        if (args.length > 1) {
            msgObject.reply("Woah, one at a time there buddy!");
        }
        if ((this.commandList).includes(args[0])) {
            let helpMessage = await this.getHelpMessage(args[0]);
            msgObject.channel.send(helpMessage);
        }
    }
    async getHelpMessage(commandName) {
        const {default: commandClass} = await import(`./${commandName}.js`);
        const command = new commandClass();
        return command.help();
    }
    getCommands() {
        const commandList = []
        const commandsPath = "./commands/"
        fs.readdirSync(commandsPath).forEach(file => {
            const commandName = file.replace(".js", "")
            commandList.push(commandName)
        });
        return commandList
    }
}