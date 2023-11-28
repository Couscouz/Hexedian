const ResultModel =  require('../database/models/result.model')

module.exports.getAllResults = async (req,res) => {
    try {
        const results = await ResultModel.find()
        res.status(200).json(results)
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

module.exports.getPeriodResults = async (req,res) => {
    try {
        const type = req.params.type

        let start = new Date()
        if (type == "daily") start.setDate(start.getDate() - 1)
        //else if (type == "test") start.setMinutes(start.getMinutes() - 1)
        else if (type == "weekly") start.setDate(start.getDate() - 7)
        else if (type == "monthly") start.setMonth(start.getMonth() - 1)
        else {
            res.status(400).json({message: "No valid result period type"})
            return
        }

        const results = await ResultModel
            .find({ createdAt: {$gte: start, $lte: new Date()} })
            .sort('rng')

        res.status(200).json(results)
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

module.exports.setResult = async (req,res) => {
    try {
        if (!req.body.player) {
            res.status(400).json({message: "Merci de mettre un joueur"})
            return
        }

        if (!req.body.rng) {
            res.status(400).json({message: "Merci de mettre un rng"})
            return
        }
        
        const result = await ResultModel.create({
            player: req.body.player,
            rng: req.body.rng,
            gameType: req.body.gameType
        })
        res.status(200).json({message: `new result is set`, result: result})
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

module.exports.editResult = async (req,res) => {
    try {
        const result = await ResultModel.findById(req.params.id)

        if (!result) {
            res.status(400).json({message: `No result with id=${req.pamras.id}`})
            return
        }

        const updateResult = await ResultModel.findByIdAndUpdate(
            result,
            req.body,
            {new: true} //Allow to add elements
        )
        res.status(200).json({message: `result is edited`, oldResult: result, newResult: updateResult})
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

module.exports.deleteResult = async (req,res) => {
    try {
        await ResultModel.findByIdAndDelete(req.params.id)
        res.status(200).json({message: `result with id=${req.params.id} is deleted`})
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

module.exports.deleteAllResult = async (req,res) => {
    try {
        await ResultModel.deleteMany({})
        res.status(200).json({message: `all results are deleted`})
    }   
    catch (err) {
        console.log(err);
        res.status(400)
    }
}
