const mongoose = require('mongoose')

const connectDB = async () => {
    mongoose.set('strictQuery', false)
    console.log(process.env.MONGO_PWD)
    mongoose.connect("mongodb+srv://Couscouz:" + process.env.MONGO_PWD + "@wot-api.mhvdbg3.mongodb.net/?retryWrites=true&w=majority")
        .then(() => console.log("DB connected"))
        .catch((err) => { console.log(err);})
}

module.exports = connectDB