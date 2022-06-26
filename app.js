const express = require('express')
const mongoose= require('mongoose')
const app = express()
const filerouter = require('./routes/files')
require('dotenv').config()

mongoose.connect(process.env.DB_LINK,{
    useUnifiedTopology:true,useNewUrlParser:true},
    ()=>{console.log('db connected')
})
// Various routes 
app.use('/fileupload',filerouter)

app.listen(process.env.PORT)
