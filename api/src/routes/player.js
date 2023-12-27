const { test,getAll,getOne,getAllSorted,getTopNSorted,getTopN,getClanOfOne,update,deleteAll,sendReport } = require('@app/controllers/player.controller');
const express = require('express');
const router = express.Router();

router.get("/test", test);

router.get("/", getAll);
router.get("/getById/:player_id", getOne);
router.get("/sort/:sortType", getAllSorted);
router.get("/sort/:sortType/top/:limit", getTopNSorted);
router.get("/top/:limit", getTopN);
router.get("/:player_id/clan", getClanOfOne);
router.get("/update", update);
router.get("/deleteAll", deleteAll);
router.post("/report/:content", sendReport)

module.exports = router;