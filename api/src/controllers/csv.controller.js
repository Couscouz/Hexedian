const { readFileSync, appendFile } = require('fs');
const ClanController = require('@app/controllers/clan.controller');
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
    let i=0;
    for(id of ids) {
        if (!allreadyIn.includes(String(id))){
            appendFile(playersIDpath, id+"\n", (err) => {
                    if(err) log(err)
            });
            i++
        }
    }
    log(`${i} new players added to CSV players id`)
}

module.exports.update = async () => {
    const allClansID = this.readClansID();

    const newIDs = await ClanController.getAllPlayersOfClansID(allClansID);
    log(`${newIDs.length} in French clans`);

    //writing new players ID
    this.writeAllPlayersID(newIDs);
}