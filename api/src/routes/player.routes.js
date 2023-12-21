const { test,getAll,getOne,getTopN,getByClan,update,deleteAll } = require('@app/controllers/player.controller');
const express = require('express');
const router = express.Router();

router.get("/test", test);

router.get("/", getAll);
router.get("/:player_id", getOne);
router.get("/:limit", getTopN);
router.get("/:clan_id", getByClan);

router.get("/update", update);
router.get("/deleteAll", deleteAll);

module.exports = router;