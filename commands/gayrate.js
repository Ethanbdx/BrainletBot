class gayrate {
    constructor() { }
    help() {
        return {
            embed: {
            title: ".gayrate",
            color: 5139196,
            description: "Brainlet will determine how gay you are.",
            fields: [
              {
                name: "Usage:",
                value: ".gayrate"
              }
            ]
          }
        };
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
                description: `${msgObject.member.user.username} is ${randomNum}% homosexual! :kiss_mm:`,
                color: 0x2471a3,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL
                }
            }
        });
    }
}
exports.default = gayrate;