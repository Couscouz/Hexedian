const path = require('path')

const fileExtLimiter = (allowedExt) => {
    return (req, res, next) => {
        if (path.extname(req.files.file.name) != allowedExt) return res.status(422).json({ status: "error", message: "Upload failed. Only .wotreplay file is allowed"})
        next()
    }
}

module.exports = fileExtLimiter