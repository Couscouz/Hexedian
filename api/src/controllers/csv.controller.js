const { readFileSync, appendFile } = require('fs');
const { log } = require('../services/logger');
const playersIDpath = "./src/database/csv/playersID.csv";
const clansIDpath = "./src/database/csv/clansID.csv";

module.exports.readPlayersID = () => {
    const ids = readFileSync(playersIDpath, {encoding: 'utf8'}).split("\n");
    return ids;
}

module.exports.readClansID = () => {
    const ids = readFileSync(clansIDpath, {encoding: 'utf8'}).split("\n");
    return ids;
}

module.exports.writeAllPlayersID = (ids) => {
    const allreadyIn = this.readPlayersID();
    for(id of ids) {
        if (!allreadyIn.includes(id))
            appendFile(playersIDpath, id+"\n", (err) => {
                log(err)
        });
    }
}