const ytdl = require('ytdl-core-discord');

class thanos {
    constructor() {
        this.__command = "thanos"; 
    }
    isThisCommand(command){
        return command === this.__command;
    }
    help(){
        return "You should have gone for the head."
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
            voiceChannel.join().then( async(connection) => {
                const stream = connection.play(await ytdl("https://www.youtube.com/watch?v=vJqA2fyMJQY"), {type: 'opus'});
                stream.on('err', err => {
                    console.log("Error playing thanos sound.")
                    console.log(err)
                });
                stream.on('finish', end => {
                    voiceChannel.leave();
                    selectedConnections.forEach(user => user.voice.kick("Thanos snap"));
                })
            });

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