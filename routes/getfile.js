const express = require('express')
const File = require('../models/file')
const getFile = express.Router()

getFile.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid })
        if (!file) {
            return res.json({
                message: 'Link has been expired'
            })
        }
        return res.render('download', {
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/filedownload/${file.uuid}`
        })
    }
    catch (err) {
        res.send(err);
    }
})

module.exports = getFile