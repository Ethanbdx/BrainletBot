const ytdl = require('ytdl-core-discord');
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './brainletDB.db'
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
                voiceChannel.join().then(async (connection) => {
                    console.log("Stream began");
                    const stream = connection.play(await ytdl(sound.Url), {type: 'opus'});
                    console.log(stream);
                    stream.on('error', (end) => {
                        msgObject.reply(`Something went wrong while playing ${soundName}`);
                    });
                    stream.on('finish', (end) => {

                        connection.disconnect();
                    });
                    console.log("Fucntion ended");
                });
                msgObject.reply(`Now playing ${soundName}.`);
                return;
            }
            msgObject.reply(`I couldn't find ${soundName} in my database, maybe you should add it or use .listsounds to see all the available sounds.`);
    }
}
exports.default = playsound;