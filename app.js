const express = require('express')
const mongoose= require('mongoose')
const app = express()
const filerouter = require('./routes/files')
const getFile = require('./routes/getfile')
const downloadFile = require('./routes/download')
const bodyParser = require('body-parser')
// const del = require('./models/delete')
require('dotenv').config()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.set('view engine','ejs')
app.set('views','views')
app.use(express.json());
app.use(express.static('public'))

mongoose.connect(process.env.DB_LINK,{
    useUnifiedTopology:true,useNewUrlParser:true},
    ()=>{console.log('db connected')
})

app.get('/',(req,res)=>{
    res.render('upload')
    // del();
})
app.use('/fileupload',filerouter)
app.use('/files',getFile)
app.use('/filedownload',downloadFile)

app.listen(process.env.PORT)
