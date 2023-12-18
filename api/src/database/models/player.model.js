const mongoose = require('mongoose')

const playerSchema = mongoose.Schema(
    {
        _id: Number,
        name: String,
        recent: Number,
        date: { type: Date, default: Date.now}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('Player', playerSchema)