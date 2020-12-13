const ytdl = require('ytdl-core');

class thanos {
    constructor() { }
    help(){
        return {
            embed: {
            title: ".thanos",
            color: 5139196,
            description: "Brainlet will snap using the infinity gauntlet, making things perfectly balanced....as they should be.",
            fields: [
              {
                name: "Usage:",
                value: ".thanos"
              }
            ]
          }
        };
    }
    async runCommand(args, msgObj, client) {
        const member = msgObj.member;
        const voiceChannel = msgObj.member.voice.channel;

        if(!member.permissions.has("ADMINISTRATOR")) 
        {
            msgObj.reply("You do not have permissions to use this command.");
            return;
        }
        if(!voiceChannel) 
        {
            msgObj.reply("You need to be in a voice channel for this command to work.");
            return;
        }
        const voiceConnections = voiceChannel.members;
        const voiceCount = voiceConnections.array().length;
        const selectedConnections = voiceConnections.random(Math.ceil(voiceCount / 2));
        console.log(selectedConnections);

        if(voiceChannel && voiceChannel.joinable && client.voice.connections.size == 0) 
        {
            const connection = await voiceChannel.join()
            const stream = connection.play(ytdl("https://www.youtube.com/watch?v=vJqA2fyMJQY"), { volume: 50 });
            stream.on('err', err => {
                console.log("Error playing thanos sound.")
                console.log(err)
                voiceChannel.leave();
            });
            stream.on('finish', end => {
                voiceChannel.leave();
                selectedConnections.forEach(user => user.voice.kick("Thanos snap"));
            })

        }
        else 
        {
            if(voiceChannel || voiceChannel.joinable) 
            {
                msgObj.reply("I can't seem to join that channel...");
                return;
            }
            else 
            {
                msgObj.reply("I'm already talking somewhere, hold up.");
                return;
            }
        }
    }
}

exports.default = thanos;