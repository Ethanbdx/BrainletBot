import { deleteSoundFromDB } from "../util/soundDatabase.js";
import { deleteSoundFromDisk} from '../util/soundManager.js'

export default class delsound {
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
    const soundName = args[0];
    if (!soundName) {
      msgObject.reply("You need to enter a sound to delete!");
      return;
    }

    let message = ""
    
    try {
      await deleteSoundFromDB(soundName);
      await deleteSoundFromDisk(soundName)
      message = `Sound: \`${soundName}\` has been removed from the database!`;
    } 
    catch {
      message = `There was an issue deleting the sound \`${soundName}\``
    }
    finally {
      msgObject.reply(message);
    }
  }
}