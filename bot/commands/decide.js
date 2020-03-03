class decide {
    constructor() {
        this._command = "decide";
    }
    help() {
        return "Brainlet will decide something for you";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        if (args.length === 0) {
            msgObject.reply("You need to add some options for me to pick from.");
            return;
        }
        const options = args.length;
        const decision = Math.floor(Math.random() * Math.floor(args.length));
        msgObject.channel.send({
            embed: {
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: `${msgObject.member.user.username}, I think the best option is ${args[decision]}.`,
                thumbnail: {},
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL
                }
            }
        });
    }
}
exports.default = decide;