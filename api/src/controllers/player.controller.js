const Player = require('@app/database/models/player.model');
const Clan = require('@app/database/models/clan.model')
const { sortByKey } = require('@app/utils/tools');
const { readFileSync } = require('fs');
const WargamingAPI = require('@app/utils/api/wargaming');
const WotLifeAPI = require('@app/services/api/wotlife');
const { log } = require('@app/services/logger')

module.exports.test = async (req,res) => {
    try {
        console.log("test");
        res.status(200);
    }   
    catch (err) {
        console.log(err);
        res.status(400);
    }
}

//--------------------------------------------

//Get all players, sorted by recent
module.exports.getAll = async (req,res) => {
    try {
        const all_players_sorted = await Player.find().sort('-recent');
        res.status(200).json(all_players_sorted);
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

//Get 1 player by id
module.exports.getOne = async (req,res) => {
    try {
        const the_player = await Player.find({ _id: req.params.player_id }).sort('-recent');
        res.status(200).json(the_player);
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

//Get top N players, sorted by recent
module.exports.getTopN = async (req,res) => {
    try {
        const all_players_sorted = await Player.find().sort('-recent').limit(req.params.limit);
        res.status(200).json(all_players_sorted);
    }   
    catch (err) {
        console.log(err);
        res.status(400);
    }
}

//Get all players by clan 
module.exports.getByClan = async (req,res) => {
    try {
        const clan = await Clan.find({ _id: req.params.clan_id })
        const all_players_sorted = await Player.find({ clan: clan }).sort('-recent');
        res.status(200).json(all_players_sorted);
    }   
    catch (err) {
        console.log(err);
        res.status(400);
    }
}

//--------------------------

module.exports.update = async (req,res) => {
    try {
        const playersID = readFileSync("./src/database/csv/playersID.csv", {encoding: 'utf8'}).split("\n");

        //Empty collection
        await Player.deleteMany({});

        let last_battle_limit = new Date();
        last_battle_limit.setMonth(last_battle_limit.getMonth()-1);
        
        const allPlayers = []

        const size = playersID.length;
        let i=1;
        for (ID of playersID) {
            try {
                const playerName = await WargamingAPI.getPlayerName_ByID(ID);
            //const last_battle = await WargamingAPI.getDateOfLastBattle_ByID(ID);

            //check if player exists and played < 1 month

                const clanIDofPlayer = await WargamingAPI.getClanID_ByPlayerID(ID);
                const clanOfPlayer = await Clan.findOne({ _id: clanIDofPlayer });

                const wn8 = await WotLifeAPI.getWN8(ID,playerName);
                
                const playerData = { 
                    _id: parseInt(ID),
                    name: playerName,
                    recent: wn8.recent,
                    overall: wn8.overall,
                    moe: await WargamingAPI.getNumberOf3moe_ByID(ID),
                    clan: clanOfPlayer,
                    ranking: {}
                };
                allPlayers.push(playerData)
            } catch (err) {
                console.log(err);
                log(ID)
                log(err)
            }
            console.log("("+i+"/"+size+") "+(100*i/size)+"%");
            i++;
        }

        const allPlayers_moeSort = sortByKey([...allPlayers],"moe");
        const allPlayers_recentSort = sortByKey([...allPlayers], "recent");
        const allPlayers_overallSort = sortByKey([...allPlayers], "overall");

        for (let i=0;i<allPlayers.length;i++) {
            allPlayers[i].ranking = {
                recent: allPlayers_recentSort.indexOf(allPlayers[i])+1,
                overall: allPlayers_overallSort.indexOf(allPlayers[i])+1,
                moe: allPlayers_moeSort.indexOf(allPlayers[i])+1
            }
            console.log(`(${i+1}/${allPlayers.length}) : SORTING`);
            const toAdd = new Player(allPlayers[i]);
            toAdd.save();
        }
        
        res.status(200).json();
    } catch (err) {
        console.log(err);
        res.status(400);
    }
    
}