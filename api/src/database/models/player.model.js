const mongoose = require('mongoose');

const playerSchema = mongoose.Schema(
    {
        _id: Number,
        name: String,
        recent: { type: Number, index: true },
        overall: { type: Number, index: true },
        moe: { type: Number, index: true },
        clan: { type: mongoose.Schema.Types.ObjectId, ref: 'Clan' },
        date: { type: Date, default: Date.now}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('Player', playerSchema);