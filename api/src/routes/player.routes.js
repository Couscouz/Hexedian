const { getAllPlayers,test,add } = require('@app/controllers/player.controller')
const express = require('express')
const router = express.Router()

router.get("/", getAllPlayers)
router.get("/test", test)
router.post("/addPlayer", add)

module.exports = router