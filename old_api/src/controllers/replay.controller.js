const ReplayModel = require('../database/models/replay.model')
const fileUpload = require('express-fileupload')
const path = require('path')
const fs = require('fs')
const Parser = require("binary-parser").Parser

//const data = fs.readFileSync('./binary')

get_data_block_count = (buffer) => {
    const db_cnt_offset = 4
    return buffer.readUInt32BE(db_cnt_offset)
}

get_data_blocks = (buffer) => {
    if (buffer.length == 0)
        throw new Error("No data in buffer")

    const data_blocks = []

    // Determine the number of data blocks.
    const nb_data_blocks = get_data_block_count(buffer);

    // Reserve enough space in the data_blocks vector.
    //data_blocks.reserve(nb_data_blocks);
    
    // Try to create a data block reference for each data block.
    let data_block_sz_offset = 8;
    for (let ix = 0; ix < nb_data_blocks; ix++) {
        // Create data block.
        const block_size = buffer.readUInt32BE(data_block_sz_offset);
        const data_block_offset = data_block_sz_offset + 4
        const data_block_beg = buffer.slice(data_block_offset);

        if (data_block_offset + block_size > buffer.length)
            throw new Error(`Invalid block size | data_block_offset=${data_block_offset} + block_size=${block_size} > buffer.length=${buffer.length}`);

        const data_block_end = data_block_beg + block_size;
        data_blocks.push(data_block_beg, data_block_end);

        // Modify offset for next data block.
        data_block_sz_offset = data_block_offset + block_size;
    }

    // Last slice contains encrypted / compressed game replay, seperated by 8 bytes with unknown content.
    // const decompressed_size = buffer.readUInt32(data_block_sz_offset);
    const compressed_size = buffer.readUInt32BE(data_block_sz_offset + 4);

    const start = data_block_sz_offset;
    const end = start + 8 + ((compressed_size + 7) / 8) * 8;
    data_blocks.push(buffer.slice(start, end));
}

module.exports.analyseReplay = (binaryContent) => {


    const data = {}
    binaryContent = fs.readFileSync('./binary')

    if (!(binaryContent instanceof Buffer))
        throw new Error("La data n'est pas binaire")

    const data_blocks = get_data_blocks(binaryContent)
    console.log(data_blocks);

    return

    // let stringContent = binaryContent
    // stringContent = stringContent.toString('utf-8')
    // let head = binaryContent
    // let next = binaryContent
    // let next2 = binaryContent
    // let total = binaryContent
    // let players = binaryContent
    // let shots = binaryContent
    // let allPlayers = binaryContent

    // const patternEndHead = "regionCode"
    // const patternEndPlayers = "}}}, {"
    // const patternEndShots = "}}]"

    // const endHead = stringContent.indexOf(patternEndHead) + 18 //300
    // const startPlayers = endHead + 5
    // const endPlayers = stringContent.indexOf(patternEndPlayers) + 3 //79k
    // const startShots = endPlayers + 2
    // const endAllPlayer = stringContent.indexOf(patternEndPlayers) + 3 //79k
    // //head = head.subarray(12,126830).toString('utf-8')

    // head = JSON.parse(head.subarray(12, endHead).toString('utf-8'))

    // players = JSON.parse(players.subarray(startPlayers, endPlayers).toString('utf-8'))

    // // next = next.subarray(endPlayers,endPlayers+15300).toString('utf-8')

    // // const endShots = next.indexOf(patternEndShots)+endPlayers+3

    // // //shots = JSON.parse(shots.subarray(startShots,endShots).toString('utf-8'))
    // // allPlayers = JSON.parse(shots.subarray(startShots,startShots+14492).toString('utf-8'))

    // //126830
    // //players = next.subarray(endHead+5,111700).toString('utf-
    // console.log(players);
    // console.log(Object.keys(players.common));

    // fs.appendFile('players.json', JSON.stringify(players), function (err) { if (err) throw err; console.log('Fichier mis à jour !'); });

    // //console.log(head);
    // // console.log(head.indexOf(pattern));
    // console.log("------f")
    // return data
}


module.exports.getAllReplayData = async (req, res) => {
    try {
        const replays = await ReplayModel.find()
        res.status(200).json(replays)
    }
    catch (err) {
        console.log(err);
        res.status(400)
    }
}

module.exports.getReplayData = async (req, res) => {
    try {
        if (req.params.id.length != 12) {
            res.status(400).json({ message: `No valid id=${req.params.id}` })
            return
        }

        const replay = await ReplayModel.findById(req.params.id)

        if (!replay) {
            res.status(400).json({ message: `No replay with id=${req.params.id}` })
            return
        }
        res.status(200).json(replay)
    }
    catch (err) {
        console.log(err);
        res.status(400)
    }

}

module.exports.setReplay = async (req, res) => {
    try {
        if (!req.body.player) {
            res.status(400).json({ message: "No player on replay" })
            return
        }

        if (!req.body.tank) {
            res.status(400).json({ message: "No tank on replay" })
            return
        }

        if (!req.body.map) {
            res.status(400).json({ message: "No map on replay" })
            return
        }
        const replay = await ReplayModel.create({
            player: req.body.player,
            tank: req.body.tank,
            map: req.body.map
        })
        res.status(200).json({ message: `new replay is set`, replay: replay })
    }
    catch (err) {
        console.log(err)
        res.status(400)
    }
}

module.exports.uploadReplay = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({ message: `No file sent` })
        }
        const file = req.files.file
        const filename = file.name
        const binaryContent = file.data

        const filepath = path.join(__dirname, 'files', filename)
        file.mv(filepath, (err) => {
            if (err) return res.status(500).json({ status: "error", message: err })
        })

        const result = analyseReplay(binaryContent)
        console.log(result)

        return res.status(200).json({ status: "success", message: filename })
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: `error: ${err} during upload !` })
    }
}

module.exports.deleteReplay = async (req, res) => {
    try {
        await ReplayModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: `replay with id=${req.params.id} is deleted` })
    }
    catch (err) {
        console.log(err)
        res.status(400)
    }
}

module.exports.deleteAllReplay = async (req, res) => {
    try {
        await ReplayModel.deleteMany({})
        res.status(200).json({ message: `all replays are deleted` })
    }
    catch (err) {
        console.log(err)
        res.status(400)
    }
}