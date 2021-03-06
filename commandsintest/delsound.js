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
            name: "[Name]",
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
    mongoose.connect(privateConfig.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    const deleteResult = await Sound.deleteOne({ Name: soundName });
    mongoose.connection.close();
    let message = "";
    if (deleteResult.ok == 1) {
      message = `Sound: \`${soundName}\` has been removed from the database!`;
    } else {
      message = `There was an issue deleting the sound \`${soundName}\``
    }
    msgObject.reply(message);
  }
}
exports.default = delsound;