const Player =  require('@app/database/models/player.model');
const Clan =  require('@app/database/models/clan.model');
const WargamingAPI = require('@app/services/wargaming_api');

//Get all clans, sorted by size (/!\ to modify later)
module.exports.getAll = async (req,res) => {
    try {
        const all_clans_sorted = await Clan.find().sort('-size');
        res.status(200).json(all_clans_sorted);
    }   
    catch (err) {
        console.log(err);
        res.status(400);
    }
}

//Get one clan by id
module.exports.getOne = async (req,res) => {
    try {
        const the_clan = await Clan.find({ _id: req.params.clan_id });
        res.status(200).json(the_clan);
    }   
    catch (err) {
        console.log(err);
        res.status(400);
    }
}

//Get Top N clans, sorted by size (/!\ to modify later)
module.exports.getTopN = async (req,res) => {
    try {
        const clans_sorted = await Clan.find().sort('-size').limit(req.params.limit);
        res.status(200).json(clans_sorted);
    }
    catch (err) {
        console.log(err);
        res.status(400);
    }
}

//Get 1 clan by player id
module.exports.getByPlayer = async (req,res) => {
    try {
        const player = await Player.find({ _id: req.params.clan_id });
        res.status(200).json(player.clan);
    }   
    catch (err) {
        console.log(err);
        res.status(400);
    }
}