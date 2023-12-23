const mongoose = require('mongoose');

const clanSchema = mongoose.Schema(
    {
        _id: Number,
        tag: { type: String, maxlength: 5 },
        logo: Buffer,
        size: { type: Number, index: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('Clan', clanSchema);