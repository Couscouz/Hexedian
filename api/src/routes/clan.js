const { getAll,getOne,getAllSorted,getTopNSorted,getTopN,getPlayersOfOne,update } = require('@app/controllers/clan.controller');
const express = require('express');
const router = express.Router();

router.get("/", getAll);
router.get("/getById/:clan_id", getOne);
router.get("/sort/:sortType", getAllSorted);
router.get("/sort/:sortType/top/:limit", getTopNSorted)
router.get("/top/:limit", getTopN);
router.get("/:clan_id/players", getPlayersOfOne)
router.get("/update", update);

module.exports = router;