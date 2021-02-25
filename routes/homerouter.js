const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth')
router.get('/',ensureGuest, (req,res)=>{
    res.render('HomeScreen')
})

router.get('/HomeafterLogin', ensureAuth, (req,res)=>{
    console.log(req.user);
    res.render('HomeafterLogin',{
        name: req.user.firstName,
        image:req.user.image
    })

})

router.get('/about', (req,res)=>{
    res.send('empty About');
    
})
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})
router.get('/register', (req,res)=>{
    // res.send('Register pagewill open');
    res.render('ho');
})
module.exports = router;