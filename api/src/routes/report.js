const { createReport } = require('@app/controllers/report.controller');
const express = require('express');
const router = express.Router();

router.post("/new", createReport);

module.exports = router;