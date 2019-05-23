"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class weebrate {
    constructor() {
        this._command = "weebrate";
    }
    help() {
        return "Brainlet will determine how much of a weeb you are.";
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
exports.default = weebrate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VlYnJhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvd2VlYnJhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxNQUFxQixRQUFRO0lBQTdCO1FBRXFCLGFBQVEsR0FBRyxVQUFVLENBQUM7SUE4QjNDLENBQUM7SUE1QkcsSUFBSTtRQUNBLE9BQU8scURBQXFELENBQUM7SUFDakUsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNELFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjtRQUMxRSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQTtRQUNqRCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNuQixLQUFLLEVBQUU7Z0JBQ0gsTUFBTSxFQUFFO29CQUNKLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVE7b0JBQzFCLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7aUJBQ2xDO2dCQUNELEtBQUssRUFBRSxtQkFBbUI7Z0JBQzFCLFNBQVMsRUFBRTtvQkFDUCxHQUFHLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTO2lCQUNsQztnQkFDRCxXQUFXLEVBQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLE9BQU8sU0FBUywrQkFBK0I7Z0JBQzdGLEtBQUssRUFBRSxRQUFRO2dCQUNmLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtnQkFDckIsTUFBTSxFQUFFO29CQUNILFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7aUJBQ25DO2FBRUo7U0FDSixDQUFDLENBQUE7SUFDTCxDQUFDO0NBQ0o7QUFoQ0QsMkJBZ0NDIn0=