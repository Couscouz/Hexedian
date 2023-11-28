const MB = 5
const FILE_SIZE_LIMIT = MB * 1024 * 1024

const fileSizeLimiter = (req, res, next) => {
    console.log(req.files.file.size);
    console.log(FILE_SIZE_LIMIT);
    if (req.files.file.size > FILE_SIZE_LIMIT) 
        return res.status(413).json({ status: "error", message: `Upload failed. File size is the file size limit of ${MB} MB`})
    next()
}

module.exports = fileSizeLimiter