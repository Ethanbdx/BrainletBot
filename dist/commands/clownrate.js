"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class clownrate {
    constructor() {
        this._command = "clownrate";
    }
    help() {
        return "Brainlet will determine how much of a clown you are.";
    }
    isThisCommand(command) {
        return command === this._command;
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
exports.default = clownrate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvd25yYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2Nsb3ducmF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLE1BQXFCLFNBQVM7SUFBOUI7UUFFcUIsYUFBUSxHQUFHLFdBQVcsQ0FBQztJQW1ENUMsQ0FBQztJQWpERyxJQUFJO1FBQ0EsT0FBTyxzREFBc0QsQ0FBQztJQUNsRSxDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCO1FBQ3pFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFBO1FBQ2pELElBQUksU0FBUyxHQUFHLEVBQUUsRUFBRTtZQUNoQixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDbkIsS0FBSyxFQUFFO29CQUNILE1BQU0sRUFBRTt3QkFDSixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO3dCQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO3FCQUNsQztvQkFDRCxLQUFLLEVBQUUsbUJBQW1CO29CQUMxQixTQUFTLEVBQUU7d0JBQ1AsR0FBRyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUztxQkFDbEM7b0JBQ0QsV0FBVyxFQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxPQUFPLFNBQVMsc0RBQXNEO29CQUNwSCxLQUFLLEVBQUUsUUFBUTtvQkFDZixTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLE1BQU0sRUFBRTt3QkFDSixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO3FCQUNsQztpQkFDSjthQUNKLENBQUMsQ0FBQTtTQUNMO2FBQ0k7WUFDRCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDbkIsS0FBSyxFQUFFO29CQUNILE1BQU0sRUFBRTt3QkFDSixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO3dCQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO3FCQUNsQztvQkFDRCxLQUFLLEVBQUUsbUJBQW1CO29CQUMxQixTQUFTLEVBQUU7d0JBQ1AsR0FBRyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUztxQkFDbEM7b0JBQ0QsV0FBVyxFQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxPQUFPLFNBQVMsa0JBQWtCO29CQUNoRixLQUFLLEVBQUUsUUFBUTtvQkFDZixTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLE1BQU0sRUFBRTt3QkFDSixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO3FCQUNsQztpQkFDSjthQUNKLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztDQUNKO0FBckRELDRCQXFEQyJ9