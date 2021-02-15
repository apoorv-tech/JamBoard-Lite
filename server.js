const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const socketio = require('socket.io')


app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
//app.use(methodoverride('_method'))
app.use(express.static('public'))
//app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))


var server = app.listen(process.env.PORT || 3000)

app.get('/',(req,res)=>{
    res.render('Jamboard/index')
})