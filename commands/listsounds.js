const {MessageEmbed} = require("discord.js");
class listsounds {
    constructor() {
        this._command = "listsounds";
    }
    help() {
        return "Brainlet will tell you all he knows how to say.";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    async runCommand(args, msgObject, client) {
            const soundList = await Sounds.findAll({
                attributes: ['Name'],
            });
            const soundString = soundList.map(s => s.Name).sort(() => Math.random() - 0.5).join(', ').slice(0, 2048) || 'There are no sounds currently set!';
            const embed = new MessageEmbed()
                .setTitle('Available Sounds:')
                .setDescription(`${soundString}`)
                .setColor(0x2471a3)
                .setFooter('To add sounds, type \'.addsound [sound name] [youtube url]\'');
            return msgObject.reply("test",{embed});
    }
}
exports.default = listsounds;