const mongoose = require('mongoose')

const resultSchema = mongoose.Schema(
    {
        player: {
            type: String,
            required: true
        },
        rng: {
            type: Number,
            required: true
        },
        gameType: {
            type: String,
            required: false
        }
    },
    { 
        timestamps: true
    }
)

module.exports = mongoose.model('result',resultSchema)