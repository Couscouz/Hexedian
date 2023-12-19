const Player =  require('@app/database/models/player.model');
const { sortByKey } = require('@app/services/tools');

module.exports.getAll = async (req,res) => {
    try {
        const all_players = await Player.find();
        const all_players_sorted = sortByKey(all_players, 'recent');

        for (let i =0;i<20;i++){
            console.log((i+1)+" : "+all_players_sorted[i].name + "("+all_players_sorted[i].recent+")");
        }

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