const { appendFile } = require('fs');
const logFilePath = process.env.LOG_FILE_PATH || 'log.txt';
const reportFilePath = 'report.txt';

module.exports.log = (status,type='INFO') => {
    const date = new Date();
    const sentence = `${date.getDate()}/${date.getMonth()+1} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${type}   : ${status}\n`;
    appendFile(logFilePath, sentence, (err) => {
        if (err) throw err;
    });
}

module.exports.report = (message) => {
    const date = new Date();
    const toWrite = [];
    toWrite.push("\n----START-OF-REPORT----------\n");
    toWrite.push(`${date.getDate()}/${date.getMonth()+1} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\n`);
    toWrite.push(message);
    toWrite.push("\n----END-OF-REPORT----------------\n");
    console.log(toWrite);
    for (sentence of toWrite) {
        appendFile(reportFilePath, sentence, (err) => {
            if (err) throw err;
        });
    }
}

/*
03/22 08:51:01 INFO   :.main: *************** RSVP Agent started ***************
03/22 08:51:01 INFO   :.main: Using log level 511
*/