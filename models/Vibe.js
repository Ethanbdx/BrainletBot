const mongoose = require("mongoose");

const vibeSchema = mongoose.Schema({
    UserId: {
        type: String,
        unique: true,
        required: true
    },
    LastCheck: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("Vibe", vibeSchema);