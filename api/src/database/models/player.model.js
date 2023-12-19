const mongoose = require('mongoose')

const playerSchema = mongoose.Schema(
    {
        _id: Number,
        name: String,
        recent: Number,
        overall: Number,
        moe: Number,
        recentRanking: Number,
        overallRanking: Number,
        moeRanking: Number,
        clan: { type: mongoose.Schema.Types.ObjectId, ref: 'Clan' },
        date: { type: Date, default: Date.now}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('Player', playerSchema)