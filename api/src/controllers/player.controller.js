const Player = require('@app/database/models/player.model');
const Clan = require('@app/database/models/clan.model')
const { sortByKey } = require('@app/services/tools');
const { readFileSync } = require('fs');
const WotAPI = require('@app/services/wot_api');
const WotLifeAPI = require('@app/services/wotlife_api');
const { log } = require('@app/services/update/process')

module.exports.getAll = async (req,res) => {
    try {
        const all_players_sorted = await Player.find({ recent: { $ne: 0 } }).sort('-recent')
        // const a = await Player.find({recent: 0})
        const value = all_players_sorted[all_players_sorted.length-1]
        res.status(200).json(value)
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
                const playerName = await WotAPI.getPlayerName_ByID(ID);
            //const last_battle = await WotAPI.getDateOfLastBattle_ByID(ID);

            //check if player exists and played < 1 month

                const clanIDofPlayer = await WotAPI.getClanID_ByPlayerID(ID);
                const clanOfPlayer = await Clan.findOne({ _id: clanIDofPlayer });

                const wn8 = await WotLifeAPI.getWN8(ID,playerName);
                
                const playerData = { 
                    _id: parseInt(ID),
                    name: playerName,
                    recent: wn8.recent,
                    overall: wn8.overall,
                    moe: await WotAPI.getNumberOf3moe_ByID(ID),
                    clan: clanOfPlayer,
                    ranking: {}
                };
                allPlayers.push(playerData)
            } catch (err) {
                console.log(err);
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

module.exports.deleteAll = async (req,res) => {
    try {
        await Player.deleteMany({});
        res.status(200);
    }   
    catch (err) {
        console.log(err);
        res.status(400);
    }
}