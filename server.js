const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const Jamboardrouter = require('./routes/Jamboard/jamboard')
const dashboardrouter = require('./routes/Jamboard/dashboard')
const authrouter = require("./routes/authcontroller")
const {requireauth,checkuser} = require("./middleware/authmiddleware")
const cookieparser = require("cookie-parser")
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require("mongoose")

dotenv.config({
	path:"./config/config.env"
})

require('./config/passport-setup')(passport);

app.set('view engine','ejs')

//encrypting Cookies
app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:false
}))

// creating session using cookies
app.use(passport.initialize());
app.use(passport.session());

app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
//app.use(methodoverride('_method'))
app.use(express.static('public'))
//app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))
app.use(express.json())
app.use(cookieparser())
app.use("*",checkuser)

app.use('/jamboard',Jamboardrouter)
app.use('/dashboard',dashboardrouter)
app.use('/auth', require('./routes/auth'));
app.use(authrouter)


app.get('/',(req,res)=>{
	res.render('index')
})



mongoose.connect("mongodb+srv://user2:WAcpv8bt27VmFpLW@cluster0.2azvv.mongodb.net/Jamboard",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("connected to the database")
})

let server = app.listen(process.env.PORT || 4000)
console.log("app has started")

var socket = require('socket.io')

var io = socket(server)

io.use(async (socket,next)=>{
	try {
		socket.userid = socket.handshake.query._id
		next()
	} catch (error) {
		console.log(error)
	}
})

io.sockets.on('connection',newConnection)

const history = []

function newConnection(socket)
{
	console.log('new connection: '+socket.userid)
	socket.on('mouse',mouseMsg)

	for(let item of history)
	{
		socket.emit('mouse',item)
	}

	function mouseMsg(data)
	{
		history.push(data)
		//console.log(user)
		socket.broadcast.emit('mouse',data) 
	}
}