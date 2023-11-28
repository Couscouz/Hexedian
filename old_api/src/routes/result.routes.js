const express = require('express')
const { setResult, getAllResults, getPeriodResults, editResult, deleteResult, deleteAllResult } = require('../controllers/result.controller')
const router = express.Router()

router.get("/", getAllResults)
router.get("/:type", getPeriodResults)

router.post("/", setResult)

router.put("/:id", editResult)

router.delete("/:id", deleteResult)
router.delete("/", deleteAllResult)

router.patch("/like-post/:id", (req,res) => {
    res.json({messageId: `Post liked id=${req.params.id}`})
})

router.patch("/dislike-post/:id", (req,res) => {
    res.json({messageId: `Post disliké id=${req.params.id}`})
})

module.exports = router