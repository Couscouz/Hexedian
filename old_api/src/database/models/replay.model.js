const mongoose = require('mongoose')

const replaySchema = mongoose.Schema(
    {
        player: {
            type: String,
            required: true
        },
        tank: {
            type: String,
            required: true
        },
        map: {
            type: String,
            required: true
        },
        shots: {
            type: [Number],
            required: false
        }
    },
    { 
        timestamps: true
    }
)

module.exports = mongoose.model('replay',replaySchema)