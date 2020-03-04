const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const privateConfig = require("../private")
const Sound = require("../models/Sound")
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
        mongoose.connect(privateConfig.private.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
        const query = Sound.find();
        query.select('Name');
        await query.exec((err, sound) => {
            //Making a comma seperated list of all the results.
            const soundString = sound.map(sound => sound.Name).sort(() => Math.random() - 0.5).join(', ').slice(0, 2048)
            const embed = new MessageEmbed()
                .setTitle('Available Sounds:')
                .setDescription(`${soundString}`)
                .setColor(0x2471a3)
                .setFooter('To add sounds, type \'.addsound [sound name] [youtube url]\'');
            return msgObject.reply("Here ya go!", { embed });
        })
    }
}
exports.default = listsounds;