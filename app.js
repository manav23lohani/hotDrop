const express = require('express')
const mongoose= require('mongoose')
const app = express()
const filerouter = require('./routes/files')
const getFile = require('./routes/getfile')
const downloadFile = require('./routes/download')
require('dotenv').config()

app.set('view engine','ejs')
app.set('views','views')
app.use(express.json());
app.use(express.static('public'))

mongoose.connect(process.env.DB_LINK,{
    useUnifiedTopology:true,useNewUrlParser:true},
    ()=>{console.log('db connected')
})
// Various routes
app.get('/',(req,res)=>{
    res.render('upload')
})
app.use('/fileupload',filerouter)
app.use('/files',getFile)
app.use('/filedownload',downloadFile)

app.listen(process.env.PORT)
