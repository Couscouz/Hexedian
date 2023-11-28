const { getAllResults } = require('@app/controllers/player.controller')
const express = require('express')
const router = express.Router()

router.get("/", getAllResults)