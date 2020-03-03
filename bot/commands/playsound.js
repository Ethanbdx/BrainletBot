const ytdl = require('ytdl-core-discord');
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../brainletDB.db'
});
const Sounds = sequelize.define('Sounds', {
    Name: {
        type: Sequelize.STRING,
        unique: true,
    },
    Url: Sequelize.STRING,
    CreatedBy: Sequelize.STRING
});
class playsound {
    constructor() {
        this._command = "playsound";
    }
    help() {
        return "Brainlet does the talking.";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    async runCommand(args, msgObject, client) {
            const soundName = args;
            const voiceChannel = msgObject.member.voice.channel;
            if (!soundName) {
                msgObject.reply("You need to enter a sound to play, using .playsound [soundname]");
                return;
            }
            if (!voiceChannel) {
                msgObject.reply("You need to be in a voice channel to use this command.");
                return;
            }
            if (client.voice.connections.size != 0) {
                msgObject.reply("I'm not done yet!");
                return;
            }
            const sound = await Sounds.findOne({
                where: {
                    Name: soundName,
                }
            });
            if (sound) {
                voiceChannel.join().then(async(connection) => {
                    const dispatcher = connection.playOpusStream(await ytdl(sound.Url));
                    dispatcher.on('error', err => {
                        msgObject.reply(`Something went wrong while playing ${soundName}`);
                    });
                    dispatcher.on('end', end => {
                        voiceChannel.leave();
                    });
                });
                msgObject.reply(`Now playing ${soundName}.`);
                return;
            }
            msgObject.reply(`I couldn't find ${soundName} in my database, maybe you should add it or use .listsounds to see all the available sounds.`);
    }
}
exports.default = playsound;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheXNvdW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3BsYXlzb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzFDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN2QyxNQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQztJQUM1QixPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsa0JBQWtCO0NBQzlCLENBQUMsQ0FBQztBQUVILE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO0lBQ3RDLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixNQUFNLEVBQUUsSUFBSTtLQUNmO0lBQ0QsR0FBRyxFQUFFLFNBQVMsQ0FBQyxNQUFNO0lBQ3JCLFNBQVMsRUFBRSxTQUFTLENBQUMsTUFBTTtDQUM5QixDQUFDLENBQUM7QUFFSCxNQUFxQixTQUFTO0lBQTlCO1FBRXFCLGFBQVEsR0FBRyxXQUFXLENBQUM7SUErQzVDLENBQUM7SUE3Q0csSUFBSTtRQUNBLE9BQU8sNEJBQTRCLENBQUM7SUFDeEMsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDL0UsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFBO1lBQ3RCLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1lBQ25ELElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ1osU0FBUyxDQUFDLEtBQUssQ0FBQyxpRUFBaUUsQ0FBQyxDQUFBO2dCQUNsRixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNmLFNBQVMsQ0FBQyxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQTtnQkFDekUsT0FBTzthQUNWO1lBQ0QsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtnQkFDbkMsU0FBUyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO2dCQUNwQyxPQUFPO2FBQ1Y7WUFDRCxNQUFNLEtBQUssR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQy9CLEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsU0FBUztpQkFDbEI7YUFDSixDQUFDLENBQUM7WUFDSCxJQUFJLEtBQUssRUFBRTtnQkFDUCxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQU0sVUFBVSxFQUFDLEVBQUU7b0JBQ3pDLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRXBFLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO3dCQUN6QixTQUFTLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxTQUFTLEVBQUUsQ0FBQyxDQUFBO29CQUN0RSxDQUFDLENBQUMsQ0FBQTtvQkFFRixVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRTt3QkFDdkIsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUN6QixDQUFDLENBQUMsQ0FBQTtnQkFDTCxDQUFDLENBQUEsQ0FBQyxDQUFBO2dCQUVGLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUU3QyxPQUFPO2FBQ1Y7WUFDRCxTQUFTLENBQUMsS0FBSyxDQUFDLG1CQUFtQixTQUFTLDhGQUE4RixDQUFDLENBQUE7UUFDL0ksQ0FBQztLQUFBO0NBQ0o7QUFqREQsNEJBaURDIn0=