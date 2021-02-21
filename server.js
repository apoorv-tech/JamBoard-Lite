const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const Jamboardrouter = require('./routes/Jamboard/jamboard')


app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
//app.use(methodoverride('_method'))
app.use(express.static('public'))
//app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))

app.use('/jamboard',Jamboardrouter)

app.get('/',(req,res)=>{
	res.render('index')
})

var server = app.listen(process.env.PORT || 3000)

var socket = require('socket.io')

var io = socket(server)

io.sockets.on('connection',newConnection)

function newConnection(socket)
{
	console.log('new connection: '+socket.id)
	socket.on('mouse',mouseMsg)

	function mouseMsg(data)
	{
		socket.broadcast.emit('mouse',data) 
	}
}