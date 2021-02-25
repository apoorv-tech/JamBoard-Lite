const express = require('express');
 const app = express();
 const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');


 dotenv.config({
     path:"./config/config.env"
 })

require('./config/passport-setup')(passport);


 const mongoose = require('mongoose');




//  var expressLayouts = require('express-ejs-layouts');
// const { connect } = require('mongoose');
const connectDB = require('./config/db');
connectDB();


app.set("view engine", "ejs");
// app.use(expressLayouts);
app.set('views',__dirname+'/views');

//encrypting Cookies
app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:false
}))

// creating session using cookies
app.use(passport.initialize());
app.use(passport.session());

// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));


app.use('/login', require('./routes/loginrouter'));
//  app.get('/',(req,res)=>{
//      res.render('ho');
//  })

app.use('/', require('./routes/homerouter'));

app.use('/auth', require('./routes/auth'));

 

 app.listen(4000, ()=> {
     console.log("Listening on port 4000...");
     console.log(process.env.PORT);
     console.log(typeof process.env.MONGO_URI);

 })
