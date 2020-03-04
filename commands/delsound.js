const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../brainletDB.db'
});
const Sounds = sequelize.define('Sounds', {
    Name: {
        type: Sequelize.STRING,
        unique: true,
    },
    Url: Sequelize.STRING,
    CreatedBy: Sequelize.STRING
});
class delsound {
    constructor() {
        this._command = "delsound";
    }
    help() {
        return "Brainlet will forget a given sound.";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const soundName = args;
            if (!soundName) {
                msgObject.reply("You need to enter a sound to delete!");
                return;
            }
            const rowCount = yield Sounds.destroy({
                where: {
                    Name: soundName,
                },
            });
            if (!rowCount) {
                msgObject.reply("There is no sound by that name to delete.");
                return;
            }
            msgObject.reply(`${soundName} has been deleted.`);
        });
    }
}
exports.default = delsound;