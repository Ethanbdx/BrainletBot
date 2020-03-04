class dankrate {
    constructor() {
        this._command = "dankrate";
    }
    help() {
        return "Brainlet will determine how dank you are.";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        const randomNum = Math.floor(Math.random() * 100);
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
                description: `${msgObject.member.user.username} is ${randomNum}% dank! :100: :ok_hand:`,
                color: 0x2471a3,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL
                }
            }
        });
    }
}
exports.default = dankrate;