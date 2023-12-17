const cheerio = require('cheerio')
const axios = require('axios')

const getURL = (id,name) => 'https://tomato.gg/stats/EU/' + name + '%3D'+ id;

const getHTML = async (url) => {
    const { data: html } = await axios.get(url);
    return html;
}

const get30DaysWN8_WoTLife = async (id,name) => {
    const url = "https://fr.wot-life.com/eu/player/"+name+"-"+id+"/";

    const data = await getHTML(url);

    const $ = cheerio.load(data);
    const temp = $('.stats-table tbody tr:nth-child(16) td:nth-child(5)').text();
    const value = parseInt(temp.split(',')[0])
    console.log(value);
    return value;
}   

const perform = async (id,name) => {
    const url =  getURL(id,name) + '?tab=advanced';

    // axios.get(url).then(({ data }) => { 
	// 	const $ = cheerio.load(data); 
 
	// 	const overview = $('.giPEpe').text();

    //     const recent = overview.slice(0,4);
    //     const overall = overview.split('%')[1].slice(0,4)
        
	// 	console.log("recent="+recent+" overall="+overall);
    // });
    


}


module.exports.test = async (req,res) => {
    try {
        const name = "Couscouz_"
        const id = 508990083
        const overall = await get30DaysWN8_WoTLife(id,name)
        console.log(("overall="+overall));
        res.status(200)
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}