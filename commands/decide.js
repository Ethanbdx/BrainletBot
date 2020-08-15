class decide {
  constructor() { }
  help() {
    return {
      embed: {
        title: ".decide",
        color: 5139196,
        description: "Brainlet will pick the best option for you.",
        fields: [
          {
            name: "Usage:",
            value: ".decide [option 1] [option 2] ... [option n]"
          },
          {
            name: "[option]",
            value: "Any option Brainlet may choose."
          }
        ]
      }
    };;
  }
  runCommand(args, msgObject, client) {
    if (args.length === 0) {
      msgObject.reply("You need to add some options for me to pick from.");
      return;
    }
    const decision = Math.floor(Math.random() * Math.floor(args.length));
    msgObject.channel.send({
      embed: {
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: `${msgObject.member.user.username}, I think the best option is ${args[decision]}.`,
        thumbnail: {},
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL
        }
      }
    });
  }
}
exports.default = decide;