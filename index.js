import Discord from 'discord.js';
import fs from 'fs';
import {createDatabase} from './util/database.js';
import config from './config.js';

const bot = new Discord.Client();
const botChannel = config.botChannel;
let commands = new Map();

loadCommands("./commands");
ensureDirectoriesCreated();

bot.on("ready", () => {
    console.log("Brainlet is alive.");
});

bot.on("guildMemberRemove", mem => {
    if(mem.guild.id != config.guildId)
    if (!botChannel) return;
    if (!((botChannel) => botChannel.type === "text")(botChannel)) return;
    botChannel.send(`${mem} has left the server.`);
});

bot.on("message", msg => {
    if (!msg.guild) return;
    if (msg.author.bot) return;
    if (msg.guild.id == config.guildId && msg.channel.id != botChannel) return;
    if (!msg.content.startsWith(".")) return;
    handleCommand(msg);
});

async function handleCommand(msg) {
    let command = msg.content.split(" ")[0].replace(".", "");
    let args = msg.content.split(" ").splice(1);
    if (!commands.has(command)) return;
    try {
        await commands.get(command).runCommand(args, msg, bot);
    }
    catch (err) {
        console.log(err)
    }
}

function loadCommands(commandsPath) {
    fs.readdir(commandsPath, (err, files) => {
        files.forEach(async (file) => {

            const commandClass = await import(`${commandsPath}/${file}`);
            commands.set(commandName, commandClass);
            console.log(commandInstance);
        })
    })
}

function ensureDirectoriesCreated() {
    if(!fs.existsSync('./sounds')) {
        console.log('Adding sound directory...')
        fs.mkdirSync('./sounds')
        console.log('Sounds directory added successfully!')
    }

    if(!fs.existsSync('./brainlet.db')) {
        console.log('Creating brainlet database...')
        createDatabase();
        console.log('Database created sucessfully!')
        
    }

}

bot.login(config.token);