const { appendFile } = require('fs');
const logFilePath = 'src/services/update/log.txt';

module.exports.main = async () => {
    log("Starting daily update");

    //Update clans

    //update players

    //Sort players

    log("End of daily update");
}

const log = (status) => {
    const date = new Date();
    const sentence = `${date.getDate()}/${date.getMonth()+1} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} INFO   : ${status}\n`;
    appendFile(logFilePath, sentence, (err) => {
        if (err) throw err;
    });
}

/*
03/22 08:51:01 INFO   :.main: *************** RSVP Agent started ***************
03/22 08:51:01 INFO   :.main: Using log level 511
*/