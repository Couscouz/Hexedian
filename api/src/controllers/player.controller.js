const PlayerModel =  require('@app/database/models/player.model')

module.exports.getAllPlayers = async (req,res) => {
    try {
        const results = await PlayerModel.find()
        res.status(200).json(results)
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

module.exports.test = async (req,res) => {
    try {
        console.log("test")
        res.status(200).json(results)
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}