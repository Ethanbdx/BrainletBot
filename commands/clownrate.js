export default class clownrate {
    constructor() { }
    help() {
        return {
            embed: {
                title: ".clownrate",
                color: 5139196,
                description: "Brainlet will determine how much of a clown you are.",
                fields: [
                    {
                        name: "Usage:",
                        value: ".clownrate"
                    }
                ]
            }
        };
    }
    runCommand(args, msgObject, client) {
        const randomNum = Math.floor(Math.random() * 100);
        if (randomNum > 80) {
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
                    description: `${msgObject.member.user.username} is ${randomNum}% clown! HONK :red_circle: HONK :red_circle: :clown:`,
                    color: 0x2471a3,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL
                    }
                }
            });
        }
        else {
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
                    description: `${msgObject.member.user.username} is ${randomNum}% clown! :clown:`,
                    color: 0x2471a3,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL
                    }
                }
            });
        }
    }
}