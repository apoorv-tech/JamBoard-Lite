const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const socketio = require('socket.io')
const Jamboardrouter = require('./routes/Jamboard/jamboard')


app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
//app.use(methodoverride('_method'))
app.use(express.static('public'))
//app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))

app.use('/jamboard',Jamboardrouter)

var server = app.listen(process.env.PORT || 3000)