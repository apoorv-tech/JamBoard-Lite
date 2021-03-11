const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const Jamboardrouter = require('./routes/Jamboard/jamboard')
const dashboardrouter = require('./routes/Jamboard/dashboard')
const authrouter = require("./routes/authcontroller")
const {requireauth,checkuser} = require("./middleware/authmiddleware")
const Jamboard = require('./models/jamboard')
const cookieparser = require("cookie-parser")
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require("mongoose")
const bodyParser = require('body-parser')

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
app.use(bodyParser.urlencoded({extended: false}))
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
const { json } = require('body-parser')

var io = socket(server)

io.use(async (socket,next)=>{
	try {
		socket.jamid = socket.handshake.query._id
		socket.userid = socket.handshake.query._uid
		next()
	} catch (error) {
		console.log(error)
	}
})

io.sockets.on('connection',newConnection)

async function newConnection(socket)
{
	console.log('new connection: '+socket.jamid)
	socket.on('mouse',mouseMsg)

	socket.on('join',async (data)=>{
		await Jamboard.findOne({ _id: socket.jamid }).then((jaam)=>{
		    const listuser = jaam.users
		    console.log(listuser,"hello")
		    console.log(data.jam)
		    console.log(socket.userid)
		    if(listuser.includes(socket.userid)){
			    console.log(data.jam+" hello")
			    socket.join(data.jam)

				const hist = jaam.data
				for(let item of hist)
				{
					socket.emit('mouse',item)
				}

		    }
		})
	})

	//data, jam , data.jam




	socket.on('disconnecting', () => {
		console.log(socket.rooms);
	  });


	async function  mouseMsg(arr)
	{
		await Jamboard.findOne({ _id: socket.jamid }).then(async (jam)=>{
		   //console.log(jam.data)
		   let points = jam.data
		//    let users = jam.users
		   console.log("before pushing");
		   console.log(points.length);
		   for(let i=0;i<arr.length;i++){
			   points.push(arr[i])
		   }
		//    points.push(data)
		   console.log("\n\n after pushing");
		   console.log(points.length);
		   try {
			const result = await Jamboard.updateOne({'_id' : socket.jamid},{$set: { 'data' : points}},function(err,res){
				if(err) throw err
				
			}).
			then(async ()=>{
			 
				const room = String(socket.jamid)
			 //    console.log(typeof(room),room)
			 for (let index = 0; index < arr.length; index++) {
				socket.to(room).emit('mouse',arr[index])
				 
			 }
				
 
			}
			
			)
		   } catch (error) {
			   console.log(error);
		   }
		   
		})
	}	
}