const { log } = require('@app/services/logger');
const PlayerController = require('@app/controllers/player.controller');
const ClanController = require('@app/controllers/clan.controller');
const CSVController = require('@app/controllers/csv.controller');

module.exports.run = async () => {
    log("Starting daily update");

    const allPlayersID = CSVController.readPlayersID();
    const allClansID = CSVController.readClansID();

    const newIDs = ClanController.getAllPlayersOfClansID(allClansID);
    
    const temp = newIDs.concat(allPlayersID);
    const set = new Set(temp);
    const newAllPlayersID = Array.from(set);

    await CSVController.writeAllPlayersID(newAllPlayersID);

    await ClanController.update(allClansID);

    await PlayerController.deleteAll();
    await ClanController.deleteAll();

    //Update clans

    //update players

    log("End of daily update");
}


module.exports.sendDailyReport = async () => {
    
}
