const express = require('express')
const File = require('../models/file')
const getFile = express.Router()

getFile.get('/:uuid',async(req,res)=>{
    const file = await File.findOne({uuid:req.params.uuid})
    if(!file){
        return res.json({
            message:'Link has been expired'
        })
    }
    return res.render('download',{
        uuid: file.uuid,
        fileName: file.fileName,
        fileSize: file.fileSize,
        downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
    })
})

module.exports=getFile