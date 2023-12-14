const cheerio = require('cheerio')
const axios = require('axios')

const getURL = (id,name) => 'https://tomato.gg/stats/EU/' + name + '%3D'+ id;

const getOverallWN8 = async (id,name) => {
    let overall = undefined;
    try {
        const url = getURL(id,name)
        const data = axios.get(url)
        const $ = cheerio.load(data); 
        overall = $('.giPEpe').text().split('%')[1].slice(0,4);
    } catch (err) {
        console.log(err);
        res.status(400);
    }
    return overall;
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

    axios.get(url+'?tab=advanced').then(({ data }) => { 
		const $ = cheerio.load(data); 
 
		const heatmapDiv = $('.fnejWB').eq(4)
        console.log(heatmapDiv.text())
        
    });
}





module.exports.test = async (req,res) => {
    try {
        const name = "Couscouz_"
        const id = 508990083
        await perform(id,name)
        res.status(200)
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}