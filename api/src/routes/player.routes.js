const { getAllResults } = require('../controllers/result.controller')
const express = require('express')
const router = express.Router()

router.get("/", getAllResults)