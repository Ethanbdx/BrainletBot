const mongoose = require("mongoose");
const privateConfig = require("../private");
const Sound = require("../models/Sound");
class testconn {
    constructor() {
        this._command = "testconn";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msg, client) {
        mongoose.connect(privateConfig.private.mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
        Sound.findOne( {Name: "hello"}, (err, res) => {
            console.log(res)
            if(res) {
                console.log(true)
            }
            else {
                console.log(false)
            }
        });
    }

}

exports.default = testconn;