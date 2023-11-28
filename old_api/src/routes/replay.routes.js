const express = require('express')
const { getAllReplayData, getReplayData, setReplay, uploadReplay, deleteReplay, deleteAllReplay } = require('../controllers/replay.controller')
const fileUpload = require('express-fileupload')

const fileExtLimiter = require('../middlewares/fileExtLimiter')
const fileSizeLimiter = require('../middlewares/fileSizeLimiter')
const filesPayloadExists = require('../middlewares/filesPayloadExists')

const router = express.Router()

router.get("/", getAllReplayData)
router.get("/:id", getReplayData)

router.post("/", setReplay)
router.post("/upload", 
    fileUpload( { createParentPath: true,}),
    filesPayloadExists,
    fileExtLimiter('.wotreplay'),
    fileSizeLimiter,
    uploadReplay
)

router.delete("/:id", deleteReplay)
router.delete("/", deleteAllReplay)

module.exports = router