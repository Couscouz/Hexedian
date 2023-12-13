const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
        id: String,
        name: String,
        recent: Number,
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('player', playerSchema)