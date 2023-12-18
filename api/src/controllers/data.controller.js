const cheerio = require('cheerio')
const axios = require('axios')
const { readFileSync } = require('fs')
const Clan = require('@app/database/models/clan.model')

const APPLICATION_ID = '104dcbb058cfe503c47eb27800beb0ec'

const getURL = (id,name) => 'https://tomato.gg/stats/EU/' + name + '%3D'+ id;

const getHTML = async (url) => {
    const { data: html } = await axios.get(url);
    return html;
}

const getClanName_ByID = async (id) => {
    let tag = "";
    const res = await fetch(`https://api.worldoftanks.eu/wot/clans/info/?application_id=${APPLICATION_ID}&clan_id=${id}`)
        .then(response => response.json()
        .then(content => { tag = content.data[id].tag })
        .catch(err => console.log(err))
    );
    return tag;
}

const getClanSize_ByID = async (id) => {
    let size = "";
    const res = await fetch(`https://api.worldoftanks.eu/wot/clans/info/?application_id=${APPLICATION_ID}&clan_id=${id}`)
        .then(response => response.json()
        .then(content => { size = content.data[id].members_count })
        .catch(err => console.log(err))
    );
    return size;
}

//Get 30 Days recent WN8 of (id,name) from WoT-Life
const get30DaysWN8_WoTLife = async (id,name) => {
    const url = `https://fr.wot-life.com/eu/player/${name}-${id}/`;

    const data = await getHTML(url);
    const $ = cheerio.load(data);
    const wn8_string = $('.stats-table tbody tr:nth-child(16) td:nth-child(5)').text();
    const wn8_int_rounded = parseInt(wn8_string.split(',')[0]);

    return wn8_int_rounded;
}

//Get Overall WN8 of (id,name) from WoT-Life
const getOverallWN8_WoTLife = async (id,name) => {
    const url = `https://fr.wot-life.com/eu/player/${name}-${id}/`;

    const data = await getHTML(url);
    const $ = cheerio.load(data);
    const wn8_string = $('.stats-table tbody tr:nth-child(16) td:nth-child(2)').text();
    const wn8_int_rounded = parseInt(wn8_string.split(',')[0]);
     
    return wn8_int_rounded;
}

module.exports.test = async (req,res) => {
    try {
        const name = "Couscouz_"
        const id = 508990083
        const recent = await get30DaysWN8_WoTLife(id,name)
        console.log(("recent="+recent));
        const overall = await getOverallWN8_WoTLife(id,name)
        console.log("overall="+overall);
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
            tag: await getClanName_ByID(ID),
            size: await getClanSize_ByID(ID)
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
    const playersID = readFileSync("./src/database/csv/playersID_20lines.csv", {encoding: 'utf8'}).split("\n");

    for (ID of playersID) {
        const name = await getClanName_ByID(ID)
        const size = await getClanSize_ByID(ID)
        console.log(ID + " a pour nom " + name + " et compte " + size + " joueurs");
        const clan = { id: ID, tag: name, size: size}
        //add to Clan Database
    }
}