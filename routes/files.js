const express = require('express')
const filerouter = express.Router()
const multer = require('multer')
const path = require('path')
const File = require('../models/file')
const { v4: uuid4 } = require('uuid')

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

let upload = multer({
    storage: storage,
    limit: { fileSize: 1000000 * 10 }
}).single('myfile') //inside single() => name attribute of the form

filerouter.post('/', (req, res) => {
    //store file
    upload(req, res, async (err) => {
        //validate request
        if (err) {
            return res.status(500).send({ error: err.message })
        }
        const response = await File.create({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        })
        //response link
        res.render('link',{ downloadLink: `${process.env.APP_BASE_URL}/files/${response.uuid}` })
    })
})
module.exports = filerouter