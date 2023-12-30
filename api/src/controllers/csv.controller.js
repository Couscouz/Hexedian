const { readFileSync, appendFile } = require('fs');
const ClanController = require('../controllers/clan.controller');
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
    return i;
}

module.exports.update = async () => {
    const allClansID = this.readClansID();

    //get all ids of players from all clans
    const newIDs = await ClanController.getAllPlayersOfClansID(allClansID);

    //writing new players ID
    const added = this.writeAllPlayersID(newIDs);
    return {inClans: newIDs.length, newPlayers: added}
}