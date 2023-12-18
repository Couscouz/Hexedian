
const { readFileSync } = require('fs')
const Clan = require('@app/database/models/clan.model')
const Player = require('@app/database/models/player.model')
const WotAPI = require('@app/services/wot_api')
const WotLifeAPI = require('@app/services/wotlife_api')

module.exports.test = async (req,res) => {
    try {
        const id = 500601400
        const name = WotAPI.getPlayerName_ByID(id)
        const a = await WotLifeAPI.get30DaysWN8_WoTLife(id,name)
        console.log(a);
        res.status(200)
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

module.exports.fillClans = async (req,res) => {
    const clansID = readFileSync("./src/database/csv/clansID.csv", {encoding: 'utf8'}).split("\n");

    for (ID of clansID) {
        const newClan = new Clan({ 
            _id: parseInt(ID),
            tag: await WotAPI.getClanName_ByID(ID),
            size: await WotAPI.getClanSize_ByID(ID)
        });
        const filter = { _id: parseInt(ID) };

        const oldClan = await Clan.findOne(filter);

        //Check if the clan needs to be updated in the db
        if (newClan.size !== oldClan.size || newClan.tag !== oldClan.tag) {
            await Clan.findOneAndUpdate(filter, newClan);
            console.log("Updated " + newClan.tag);
        } else {
            console.log("No update needed for " + newClan.tag);
        }
    }
    console.log("All clans on DB");
}

module.exports.fillPlayers = async (req,res) => {
    const playersID = readFileSync("./src/database/csv/playersID.csv", {encoding: 'utf8'}).split("\n");


    const size = playersID.length;
    let i=1;
    for (ID of playersID) {
        const oldPlayer = await Player.findOne({ _id: ID })
        if (!oldPlayer && i != -1) {

            const playerName = await WotAPI.getPlayerName_ByID(ID);

            if (playerName) {
                const clanIDofPlayer = await WotAPI.getClanID_ByPlayerID(ID);
                const clanOfPlayer = await Clan.findOne({ _id: clanIDofPlayer });
                const moeCount = 0;
                
                const newPlayer = new Player({ 
                    _id: parseInt(ID),
                    name: playerName,
                    recent: await WotLifeAPI.get30DaysWN8_WoTLife(ID,playerName),
                    //moe: moeCount,
                    clan: clanOfPlayer
                });
        
                await newPlayer.save();
                console.log("("+i+"/"+size+") " + newPlayer.name + " added");
            } else {
                console.log("("+i+"/"+size+") n'existe plus");
            }     
        } else {
            console.log("("+i+"/"+size+") existe deja");
        }
        i++;

        // const clan = await Clan.findOne({ _id: clanID }).tag;
        // const clan = { _id: parseInt(ID), name: name, recent: 0, clan: clanID }
        //console.log(newPlayer);
        //add to Clan Database
    }
}