"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class thanos {
    constructor() {
        this._command = "thanos";
    }
    help() {
        return "Randomly disconnects half the people in a voice channel";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        const voiceChannel = msgObject.member.voiceChannel;
        if (!voiceChannel) {
            msgObject.reply("You must join a channel before I can do this.");
            return;
        }
        voiceChannel.join();
        var members = voiceChannel.members.array();
        var memberId = [];
        members.forEach(mem => {
            if (!mem.user.bot) {
                memberId.push(mem.voiceChannel.connection);
                mem.voiceChannel.connection.disconnect();
            }
        });
        console.log(memberId);
    }
}
exports.default = thanos;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhhbm9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3RoYW5vcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLE1BQXFCLE1BQU07SUFBM0I7UUFFcUIsYUFBUSxHQUFHLFFBQVEsQ0FBQztJQTBCekMsQ0FBQztJQXhCRyxJQUFJO1FBQ0EsT0FBTyx5REFBeUQsQ0FBQztJQUNyRSxDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCO1FBQ3pFLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFBO1FBQ2xELElBQUcsQ0FBQyxZQUFZLEVBQUM7WUFDYixTQUFTLENBQUMsS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUE7WUFDaEUsT0FBTztTQUNWO1FBQ0QsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDMUMsSUFBSSxRQUFRLEdBQStCLEVBQUUsQ0FBQTtRQUM3QyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLElBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFBO2dCQUMxQyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUN4QztRQUVMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN6QixDQUFDO0NBQ0o7QUE1QkQseUJBNEJDIn0=