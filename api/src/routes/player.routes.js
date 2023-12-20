const { getAll,test,add,update,deleteAll } = require('@app/controllers/player.controller')
const express = require('express')
const router = express.Router()

router.get("/", getAll)
router.get("/test", test)
router.post("/addPlayer", add)
router.get("/update", update)
router.get("/deleteAll", deleteAll)

module.exports = router