const { test,getAll,getOne,getAllSorted,getTopNSorted,getTopN,getClanOfOne,update } = require('@app/controllers/player.controller');
const express = require('express');
const router = express.Router();

router.get("/test", test);

router.get("/", getAll);
router.get("/:player_id", getOne);
router.get("/sort/:sortType", getAllSorted);
router.get("/sort/:sortType/top/:limit", getTopNSorted);
router.get("/top/:limit", getTopN);
router.get("/:player_id/clan", getClanOfOne);
router.get("/update", update);

module.exports = router;