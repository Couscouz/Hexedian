const Player =  require('@app/database/models/player.model');
const Clan =  require('@app/database/models/clan.model');
const WargamingAPI = require('@app/utils/api/wargaming');
const CSVController = require('@app/controllers/csv.controller');

//Get all clans, sorted by size (/!\ to modify later)
module.exports.getAll = async (req,res) => {
    try {
        const all_clans_sorted = await Clan.find().sort({['ranking.size']: 1});
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

//Get all players, sorted by recent
module.exports.getAllSorted = async (req,res) => {
    try {
        const keys = ["size"];
        let key = keys[0];
        if (keys.includes(req.params.sortType)) 
            key = req.params.sortType;

        const all_players_sorted = await Clan.find().sort({[`ranking.${key}`]: 1});
        res.status(200).json(all_players_sorted);
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

//Get top N clans, sorted by sortType
module.exports.getTopNSorted = async (req,res) => {
    try {
        if (!req.params.limit || req.params.limit < 1) {
            res.status(400).json({ messge: "wrong limit value" });
            return
        }
        const keys = ["size"];
        let key = keys[0];
        if (keys.includes(req.params.sortType))
            key = req.params.sortType;

        const all_players_sorted = await Clan.find().sort({[`ranking.${key}`]: 1}).limit(req.params.limit);
        res.status(200).json(all_players_sorted);
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

//Get Top N clans, sorted by size (/!\ to modify later)
module.exports.getTopN = async (req,res) => {
    try {
        if (!req.params.limit || req.params.limit < 1) {
            res.status(400).json({ messge: "wrong limit value" });
            return
        }
        const clans_sorted = await Clan.find().sort({['size']: -1}).limit(req.params.limit);
        res.status(200).json(clans_sorted);
    }
    catch (err) {
        console.log(err);
        res.status(400);
    }
}

//Get 1 clan by player id
module.exports.getPlayersOfOne = async (req,res) => {
    try {
        const clan = await Clan.find({ _id: req.params.clan_id })
        const all_players_sorted = await Player.find({ clan: clan }).sort({['ranking.recent']: 1});
        res.status(200).json(all_players_sorted);
    }   
    catch (err) {
        console.log(err);
        res.status(400);
    }
}

module.exports.getAllPlayersOfClansID = async (ids) => {
    let allIDs = [];
    for (ID of ids) {
        const clanIDs = await WargamingAPI.getPlayersID_ByClanID(ID);
        allIDs = allIDs.concat(clanIDs);
        console.log("all ids of "+ID);
    }
    return allIDs;
}

module.exports.update = async () => {
    try {
        const clansID = await CSVController.readClansID();
        const size = clansID.length;
        let i=1;
        for (ID of clansID) {
            try {
                const clan = new Clan({ 
                    _id: parseInt(ID),
                    tag: await WargamingAPI.getClanName_ByID(ID),
                    logo: null, //await WargamingAPI.getClanLogo_ByID,
                    size: await WargamingAPI.getClanSize_ByID(ID)
                });
                clan.save();
            } catch (err) {
                console.log(err);
                log(ID)
                log(err)
            }
            console.log("("+i+"/"+size+") "+(100*i/size)+"%");
            i++;
        }
    } catch (err) {
        log(err);
    }
}

module.exports.deleteAll = async () => {
    await Clan.deleteMany({});
}