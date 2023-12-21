const cheerio = require('cheerio')
const axios = require('axios')

const getURL = (id,name) => 'https://tomato.gg/stats/EU/' + name + '%3D'+ id;
