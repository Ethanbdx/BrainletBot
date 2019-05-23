import * as Discord from "discord.js"
import {IBotCommand} from "../api"

export default class thanos implements IBotCommand{

    private readonly _command = "thanos";

    help(): string {
        return "Randomly disconnects half the people in a voice channel";
    }    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
        const voiceChannel = msgObject.member.voiceChannel
        if(!voiceChannel){
            msgObject.reply("You must join a channel before I can do this.")
            return;
        }
        voiceChannel.join();
        var members = voiceChannel.members.array()
        var memberId: Discord.VoiceConnection [] = []
        members.forEach(mem => {
            if(!mem.user.bot) {
            memberId.push(mem.voiceChannel.connection)
            mem.voiceChannel.connection.disconnect();
            }
            
        });
        console.log(memberId)
    }
}