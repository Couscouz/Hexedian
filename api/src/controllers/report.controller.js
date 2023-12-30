const { report } = require("../services/logger");

module.exports.createReport = async (req,res) => {
    try {
        const message = req.body.message;
        report(message);
        console.log("ici");
        res.status(200);
    } catch (err) {
        res.status(400);
    }
}