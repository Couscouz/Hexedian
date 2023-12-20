const Player =  require('@app/database/models/player.model');
const { sortByKey } = require('@app/services/tools');

module.exports.getAll = async (req,res) => {
    try {
        const all_players_sorted = await Player.find({ recent: { $ne: 0 } }).sort('-recent')
        // const a = await Player.find({recent: 0})
        console.log("->"+all_players_sorted.length);
        res.status(200).json(all_players_sorted)
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

module.exports.test = async (req,res) => {
    try {
        console.log("test")
        res.status(200)
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

module.exports.add = async (req,res) => {
    try {
        const player = new PlayerModel({
            id: req.body.id,
            name: req.body.name,
            recent: req.body.recent
        });

        player.save();

        console.log("player added")
        res.status(200).json(results)
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}