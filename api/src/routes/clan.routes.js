const { getAll,getOne,getByPlayer } = require('@app/controllers/clan.controller');
const express = require('express');
const router = express.Router();

router.get("/", getAll);
router.get("/:clan_id", getOne);
router.get("/:limit", getTopN)
router.get("/:player_id", getByPlayer)

module.exports = router;