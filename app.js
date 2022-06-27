const express = require('express')
const mongoose= require('mongoose')
const ejs = require('ejs')
const app = express()
const filerouter = require('./routes/files')
const getFile = require('./routes/getfile')
const downloadFile = require('./routes/download')
require('dotenv').config()

mongoose.connect(process.env.DB_LINK,{
    useUnifiedTopology:true,useNewUrlParser:true},
    ()=>{console.log('db connected')
})

app.set('view engine','ejs')

// Various routes 
app.use('/fileupload',filerouter)
app.use('/filedownload',getFile)
app.use('/files/download',downloadFile)

app.listen(process.env.PORT)
