const { log } = require('@app/services/logger');
const PlayerController = require('@app/controllers/player.controller');
const ClanController = require('@app/controllers/clan.controller');
const CSVController = require('@app/controllers/csv.controller');

module.exports.run = async () => {
    log("Starting daily update");

    //Update of both CSVs
    const {inClans,added} = await CSVController.update();
    log(`${inClans} in French clans`);
    log(`${added} new players added to CSV players id`)

    //Empty database
    await PlayerController.deleteAll();
    await ClanController.deleteAll();

    //Update of clans & players
    await ClanController.update();
    await PlayerController.update();

    log("End of daily update");
}


module.exports.sendDailyReport = async () => {
    
}
