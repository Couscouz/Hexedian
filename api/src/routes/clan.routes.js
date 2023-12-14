const { getAll,getAllById,getPlayersByClanId } = require('@app/controllers/clan.controller')
const express = require('express')
const router = express.Router()

router.get("/", getAll)
router.get("/:id", getAllById)
router.get("/:id/players", getPlayersByClanId)

module.exports = router