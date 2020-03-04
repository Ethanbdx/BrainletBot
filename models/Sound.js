const mongoose = require("mongoose");

const soundSchema = mongoose.Schema ({
    Name: {
        type: String,
        unique: true,
        required: true
    },
    Url: {
        type: String,
        required: true,
        unique: true
    },
    CreatedBy: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Sound", soundSchema);