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


//Message listener for commands
bot.on("message", msg => {

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



