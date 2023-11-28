const mongoose = require('mongoose')

const connectDB = async () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("DB connected"))
        .catch((err) => { console.log(err);})
}

module.exports = connectDB