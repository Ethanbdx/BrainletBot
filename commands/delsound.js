const mongoose = require("mongoose");
const privateConfig = require("../private");
const Sound = require("../models/Sound");
class delsound {
    constructor() { }
    help() {
        return {
            embed: {
              title: ".delsound",
              color: 5139196,
              description: "Brainlet will remove a sound from his sound board.",
              fields: [
                {
                  name: "Usage:",
                  value: ".delsound [Name]"
                },
                {
                  name : "[Name]",
                  value: "An existing sound name."
                }
              ]
            }
          };
    }
    async runCommand(args, msgObject, client) {
        const soundName = args;
        if (!soundName) {
            msgObject.reply("You need to enter a sound to delete!");
            return;
        }
        mongoose.connect(privateConfig.private.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
        await Sound.deleteOne({ Name: soundName }, (err,res) => {
            if(err) {
                msgObject.reply("There was an issue deleteing that sound.")
                return;
            }
            if(res) {
                msgObject.reply(`${soundName} has been deleted.`);
                return;
            }
        });
    }
}
exports.default = delsound;