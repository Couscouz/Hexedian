const { report } = require("@app/services/logger");

module.exports.createReport = async (req,res) => {
    try {
        const message = req.body.message;
        report(message);
        return res.status(200);
    } catch (err) {
        res.status(400);
    }
}