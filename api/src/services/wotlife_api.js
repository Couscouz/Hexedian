const cheerio = require('cheerio')
const axios = require('axios')

const getURL = (id,name) => 'https://tomato.gg/stats/EU/' + name + '%3D'+ id;

const getHTML = async (url) => {
    const { data: html } = await axios.get(url);
    return html;
}

//-----------------------------



//Get 30 Days recent WN8 of (id,name) from WoT-Life
module.exports.get30DaysWN8_WoTLife = async (id,name) => {
    const url = `https://fr.wot-life.com/eu/player/${name}-${id}/`;
    try {
        const data = await getHTML(url);
        const $ = cheerio.load(data);
        const wn8_string = $('.stats-table tbody tr:nth-child(16) td:nth-child(5)').text();
        return parseInt(wn8_string.split(',')[0]);
    } catch {
        //WotLife profil doesnt exist
        return 0
    }
}

//Get Overall WN8 of (id,name) from WoT-Life
module.exports.getOverallWN8_WoTLife = async (id,name) => {
    const url = `https://fr.wot-life.com/eu/player/${name}-${id}/`;

    const data = await getHTML(url);
    const $ = cheerio.load(data);
    const wn8_string = $('.stats-table tbody tr:nth-child(16) td:nth-child(2)').text();
    const wn8_int_rounded = parseInt(wn8_string.split(',')[0]);
     
    return wn8_int_rounded;
}