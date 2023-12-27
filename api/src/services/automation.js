const { log } = require('@app/services/logger');
const PlayerController = require('@app/controllers/player.controller');
const ClanController = require('@app/controllers/clan.controller');
const CSVController = require('@app/controllers/csv.controller');

module.exports.run = async () => {
    log("Starting daily update");

    //update of both CSVs
    await CSVController.update();

    //Empty database
    await PlayerController.deleteAll();
    await ClanController.deleteAll();


    await ClanController.update();
    //await PlayerController.update();

    log("End of daily update");
}


module.exports.sendDailyReport = async () => {
    
}
