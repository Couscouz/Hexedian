
const { readFileSync } = require('fs');
const Clan = require('../database/models/clan.model');
const Player = require('../database/models/player.model');
const WargamingAPI = require('../utils/api/wargaming');
const WotLifeAPI = require('../utils/api/wotlife');
const { sortByKey } = require('../utils/tools');

module.exports.test = async (req,res) => {
    try {
        let playersID = readFileSync("./src/database/csv/playersID.csv", {encoding: 'utf8'}).split("\n");
        let playing = 0;
        let i=1

        //Set time limit
        let limit = new Date();
        limit.setMonth(limit.getMonth()-1);

        for (ID of playersID) {
            const date = await WargamingAPI.getDateOfLastBattle_ByID(ID);
            if (date*1000 > limit) playing++;
            console.log(`(${i}/${playersID.length}) playing=${playing}`);
            i++;
        }
        console.log();
        res.status(200);
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

module.exports.fillClans = async (req,res) => {
    const clansID = readFileSync("./src/database/csv/clansID.csv", {encoding: 'utf8'}).split("\n");

    await this.resetClans();
    console.log(Clan.schema.paths);
    

    for (ID of clansID) {
        const newClan = new Clan({ 
            _id: parseInt(ID),
            tag: await WargamingAPI.getClanName_ByID(ID),
            size: await WargamingAPI.getClanSize_ByID(ID),
            logo: await WargamingAPI.getClanLogo_ByID(ID)
        });
        newClan.save();
        console.log(newClan.logo);
        console.log(newClan.tag+" saved");
        //const filter = { _id: parseInt(ID) };

        //const oldClan = await Clan.findOne(filter);

        //Check if the clan needs to be updated in the db
        // if (newClan.size !== oldClan.size || newClan.tag !== oldClan.tag || newClan.logo !== oldClan.logo) {
        //     await Clan.findOneAndUpdate(filter, newClan);
        //     console.log("Updated " + newClan.tag);
        // } else {
        //     console.log("No update needed for " + newClan.tag);
        // }
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

            const playerName = await WargamingAPI.getPlayerName_ByID(ID);

            if (playerName) {
                const clanIDofPlayer = await WargamingAPI.getClanID_ByPlayerID(ID);
                const clanOfPlayer = await Clan.findOne({ _id: clanIDofPlayer });
                
                const newPlayer = new Player({ 
                    _id: parseInt(ID),
                    name: playerName,
                    recent: await WotLifeAPI.get30DaysWN8_WoTLife(ID,playerName),
                    moe: await WargamingAPI.getNumberOf3moe_ByID(ID),
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

//-----------UPDATES-------------------

module.exports.updateClans = async (req,res) => {
    const clansID = readFileSync("./src/database/csv/clansID.csv", {encoding: 'utf8'}).split("\n");
    const nbClans = clansID.length;

    //Reset Clan collection
    await Clan.deleteMany({});

    const allClans = []

    for (ID of clansID) {
        const newClan = { 
            _id: parseInt(ID),
            tag: await WargamingAPI.getClanName_ByID(ID),
            size: await WargamingAPI.getClanSize_ByID(ID),
            logo: await WargamingAPI.getClanLogo_ByID(ID)
        };
        allClans.append(newClan);
    }

    const sizeSort = sortByKey(allClans, "size")
    for (let i=0;i<nbClans;i++) {
        await Clan.save({ _id: sizeSort[i]._id},newClan);
    }

    for (clan of allClans) {
        
    }
}



module.exports.resetClans = async (req,res) => {
    await Clan.collection.drop();
}

module.exports.resetPlayers = async (req,res) => {
    await Player.collection.drop();
}