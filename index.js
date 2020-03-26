const Discord = require("discord.js");
const privateConfig = require("./private")
const fs = require('fs');
const bot = new Discord.Client();
let commands = new Map();
loadCommands("./commands");

bot.on("ready", () => {
    console.log("Brainlet is alive.");
});

bot.on("guildMemberAdd", mem => {
    if (mem.guild.id != "410502258170789889")
        return;
    mem.send("Welcome to the EauxP Discord, in order to gain full access to our server please contact a Moderator or Admin. Thanks!");
});

bot.on("guildMemberRemove", mem => {
    const botChannel = mem.guild.channels.cache.get('510333364339998720');
    if (!botChannel) return;
    if (!((botChannel) => botChannel.type === "text")(botChannel)) return;
    botChannel.send(`${mem} has left the server.`);
});

bot.on("message", msg => {
    if (!msg.guild) return;
    if (msg.author.bot) return;
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
        files.forEach(file => {
            const commandName = file.replace(".js", "")
            const commandClass = require(`${commandsPath}/${commandName}`).default;
            const commandInstance = new commandClass();
            commands.set(commandName, commandInstance);
            console.log(commandInstance);
        })
    })
}
bot.login(privateConfig.private.token);