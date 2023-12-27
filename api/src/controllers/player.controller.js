const nodemailer = require('nodemailer');
const { readFileSync } = require('fs');
const Player = require('@app/database/models/player.model');
const Clan = require('@app/database/models/clan.model')
const { sortByKey } = require('@app/utils/tools');
const WargamingAPI = require('@app/utils/api/wargaming');
const WotLifeAPI = require('@app/utils/api/wotlife');
const { log } = require('@app/services/logger');

module.exports.test = async (req,res) => {
    try {
        //sort 1 pour croissant et -1 decroissant
        const result = await Player.find().sort({['recent']: -1});
        res.status(200).json(result);
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
        const sortType = req.query.sort || "recent";
        const section = parseInt(req.query.section) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const skipIndex = (section - 1) * limit;

        const all_players_sorted = await Player.find().sort({[sortType]: -1}).limit(limit).skip(skipIndex);
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
        const the_player = await Player.find({ _id: req.params.player_id });
        res.status(200).json(the_player);
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

//Get all players, sorted by recent
module.exports.getAllSorted = async (req,res) => {
    try {
        const keys = ["recent", "overall", "moe"];
        let key = keys[0];
        if (keys.includes(req.params.sortType)) 
            key = req.params.sortType;

        const all_players_sorted = await Player.find().sort({[key]: -1});
        res.status(200).json(all_players_sorted);
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

//Get top N players, sorted by recent
module.exports.getTopN = async (req,res) => {
    try {
        if (!req.params.limit || req.params.limit < 1) {
            res.status(400).json({ messge: "wrong limit value" });
            return
        }
        const all_players_sorted = await Player.find().sort({['recent']: -1 }).limit(req.params.limit);
        res.status(200).json(all_players_sorted);
    }   
    catch (err) {
        console.log(err);
        res.status(400);
    }
}

//Get top players, sorted by sortType
module.exports.getTopNSorted = async (req,res) => {
    try {
        //to modify later
        if (!req.params.limit || req.params.limit < 1) {
            res.status(400).json({ messge: "wrong limit value" });
            return
        }
        const keys = ["recent", "overall", "moe"];
        let key = keys[0];
        if (keys.includes(req.params.sortType)) 
            key = req.params.sortType;

        const all_players_sorted = await Player.find().sort({[key]: -1}).limit(req.params.limit);
        res.status(200).json(all_players_sorted);
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

//Get clan by player ID
module.exports.getClanOfOne = async (req,res) => {
    try {
        const player = await Player.find({ _id: req.params.clan_id });
        res.status(200).json(player.clan);
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

        let last_battle_limit = new Date();
        last_battle_limit.setMonth(last_battle_limit.getMonth()-1);

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
                
                const player = new Player({ 
                    _id: parseInt(ID),
                    name: playerName,
                    recent: wn8.recent,
                    overall: wn8.overall,
                    moe: await WargamingAPI.getNumberOf3moe_ByID(ID),
                    clan: clanOfPlayer
                });
                player.save();
            } catch (err) {
                console.log(err);
                log(ID)
                log(err)
            }
            console.log("("+i+"/"+size+") "+(100*i/size)+"%");
            i++;
        }

        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(400);
    }
    
}

module.exports.deleteAll = async () => {
    await Player.deleteMany({});
}

module.exports.sendReport = async (req,res) => {
    const reportText = req.params.content;
    const reportSubject = `[REPORT] - Test`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_HXD_USER,
            pass: process.env.GMAIL_HXD_PW
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_HXD_USER,
        to: process.env.GMAIL_HXD_USER,
        subject: reportSubject,
        text: reportText
    };
    console.log("la");
    transporter.sendMail(mailOptions, (err) => log(err));
}