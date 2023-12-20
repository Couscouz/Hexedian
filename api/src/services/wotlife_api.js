const cheerio = require('cheerio')
const axios = require('axios')

const getURL = (id,name) => 'https://tomato.gg/stats/EU/' + name + '%3D'+ id;

const getHTML = async (url) => {
    const { data: html } = await axios.get(url);
    return html;
}

//-----------------------------

//Get wn8 values from WotLife
module.exports.getWN8 = async (id,name) => {
    const url = `https://fr.wot-life.com/eu/player/${name}-${id}/`;

    const data = await getHTML(url);
    const $ = cheerio.load(data);
    const overall_string = $('.stats-table tbody tr:nth-child(16) td:nth-child(2)').text();
    const overall_rounded = parseInt(overall_string.split(',')[0]);
    const recent_string = $('.stats-table tbody tr:nth-child(16) td:nth-child(5)').text();
    const recent_rounded = parseInt(recent_string.split(',')[0]);
     
    return { overall: overall_rounded, recent: recent_rounded}; 
}