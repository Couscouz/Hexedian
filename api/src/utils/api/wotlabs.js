const cheerio = require('cheerio')
const axios = require('axios')

const getHTML = async (url) => {
    const { data: html } = await axios.get(url);
    return html;
}

//-----------------------------

//Get wn8 values from WotLife
module.exports.getWN8 = async (name) => {
    const url = `https://wotlabs.net/eu/player/${name}`;

    const data = await getHTML(url);
    const $ = cheerio.load(data);
    const overall_string = $('.boxStats div span').text();
    console.log("---------");
    console.log(overall_string);
    // const overall_rounded = parseInt(overall_string.split(',')[0]);
    // const recent_string = $('.stats-table tbody tr:nth-child(16) td:nth-child(5)').text();
    // const recent_rounded = parseInt(recent_string.split(',')[0]);
     return 0;
    // return { overall: overall_rounded, recent: recent_rounded}; 
}