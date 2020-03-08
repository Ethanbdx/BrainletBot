const Discord = require("discord.js");
const ConfigFile = require("./config");
const privateConfig = require("./private")
const bot = new Discord.Client();
let commands = [];
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
    if(!msg.guild) return;
    if (msg.author.bot) return;
    if (!msg.content.startsWith(ConfigFile.config.prefix)) return;
    handleCommand(msg);
});
async function handleCommand(msg) {
        let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "");
        let args = msg.content.split(" ").splice(1);
        for (const commandClass of commands) {
            try {
                if (!commandClass.isThisCommand(command)) {
                    continue;
                }
                await commandClass.runCommand(args, msg, bot);
            }
            catch (exception) {
                console.log(exception);
        }
    }
}
function loadCommands(commandsPath) {
    if (!ConfigFile.config || ConfigFile.config.commands.length == 0) {
        return;
    }
    ConfigFile.config.commands.forEach(commandName => {
        const commandClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandClass();
        commands.push(command);
        console.log(command);
    });
}
bot.login(privateConfig.private.token);