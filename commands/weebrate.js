export default class weebrate {
    
    constructor() { }

    help() {
        return {
            embed: {
                title: ".weebrate",
                color: 5139196,
                description: "Brainlet will determine how much of a weeb you are.",
                fields: [
                    {
                        name: "Usage:",
                        value: ".weebrate"
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
                description: `${msgObject.member.user.username} is ${randomNum}% weeb! :ideograph_advantage:`,
                color: 0x2471a3,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL
                }
            }
        });
    }
}
