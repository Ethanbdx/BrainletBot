"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjaWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2RlY2lkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLE1BQXFCLE1BQU07SUFBM0I7UUFFc0IsYUFBUSxHQUFHLFFBQVEsQ0FBQztJQWdDMUMsQ0FBQztJQTlCRyxJQUFJO1FBQ0EsT0FBTyx3Q0FBd0MsQ0FBQztJQUNwRCxDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCO1FBQ3pFLElBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUM7WUFDakIsU0FBUyxDQUFDLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFBO1lBQ3BFLE9BQU87U0FDVjtRQUNGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNyRSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUN0QixLQUFLLEVBQUU7Z0JBQ0gsTUFBTSxFQUFFO29CQUNKLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVE7b0JBQzFCLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7aUJBQ2xDO2dCQUNELEtBQUssRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsZ0NBQWdDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRztnQkFDekYsU0FBUyxFQUFFLEVBQ1Y7Z0JBQ0QsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO2dCQUNyQixNQUFNLEVBQUU7b0JBQ0gsUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztpQkFDbkM7YUFFSjtTQUNKLENBQUMsQ0FBQTtJQUNGLENBQUM7Q0FDSjtBQWxDRCx5QkFrQ0MifQ==