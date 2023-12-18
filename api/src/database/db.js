const mongoose = require('mongoose')

const connectDB = async () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(`mongodb+srv://Couscouz:${process.env.MONGO_PW}@hexedian.afvtd04.mongodb.net/`)
        .then(() => console.log("DB connected"))
        .catch((err) => { console.log(err);})
}

module.exports = connectDB