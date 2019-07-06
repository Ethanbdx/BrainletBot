import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import { IBotCommand } from "./api";

const bot: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = []

loadCommands(`${__dirname}/commands`)

bot.on("ready", () => {

    //Bot is online
    console.log("Brainlet is alive.")
})

//Sending a message to new members
bot.on("guildMemberAdd", mem => {

    if(mem.guild.id != "410502258170789889") return;
    mem.send("Welcome to the EauxP Discord, in order to gain full access to our server please contact a Moderator or Admin. Thanks!");

})
//Sending a message on members leaving/being kicked.
bot.on("guildMemberRemove", mem => {
    
    const botChannel = mem.guild.channels.get('510333364339998720');
    if (!botChannel) return;
    if(!((botChannel): botChannel is Discord.TextChannel => botChannel.type === "text")(botChannel)) return;
    botChannel.send(`${mem} has left the server.`)
    
})

//Message listener for commands
bot.on("message", msg => {

    if(msg.channel.id != "")
    if(msg.author.bot) { return; }
    
    if(!msg.content.startsWith(ConfigFile.config.prefix)) { return; }

    handleCommand(msg);
})

async function handleCommand(msg: Discord.Message){

    let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "")
    let args = msg.content.split(" ").splice(1);
    
    for(const commandClass of commands){
        try{
            if(!commandClass.isThisCommand(command)){
                continue;
            }
            await commandClass.runCommand(args, msg, bot);
        }
        catch(exception){
            console.log(exception);
        }
    }
}

function loadCommands(commandsPath: string){

    if(!ConfigFile.config || (ConfigFile.config.commands as string[]).length == 0) {return; }
    ConfigFile.config.commands.forEach(commandName => {
        
        const commandClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandClass() as IBotCommand;
        commands.push(command);
        console.log(command);
    });
}

bot.login(ConfigFile.config.token);



