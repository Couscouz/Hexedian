const mongoose = require('mongoose')

const playerSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        recent: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('player', playerSchema)