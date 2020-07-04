const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const privateConfig = require("../private")
const Sound = require("../models/Sound")
class listsounds {
    constructor() { }
    help() {
        return {
            embed: {
            title: ".listsounds",
            color: 5139196,
            description: "A list of all the available sounds.",
            fields: [
              {
                name: "Usage:",
                value: ".listsounds"
              }
            ]
          }
        };
    }
    async runCommand(args, msgObject, client) {
        mongoose.connect(privateConfig.private.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
        const sound = await Sound
        .find()
        .select('Name')
        .exec();
        
        mongoose.connection.close();
        if(sound) {
          //Making a comma seperated list of all the results.
          const soundString = sound
          .map(sound => sound.Name)
          .sort(() => Math
          .random() - 0.5).join(', ')
          .slice(0, 2048)

          const embed = new MessageEmbed()
              .setTitle('Available Sounds:')
              .setDescription(`${soundString}`)
              .setColor(0x2471a3)
              .setFooter('To add sounds, type \'.addsound [sound name] [youtube url]\'');
          return msgObject.reply("Here ya go!", { embed });
        }
        return msgObject.reply("Something is wrong with my database connection...pinging Ethan.");
    }
}
exports.default = listsounds;