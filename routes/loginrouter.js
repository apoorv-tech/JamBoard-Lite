const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');

router.get('/', ensureGuest,(req,res)=>{
    res.render('loginscreen');
})

router.get('/oauth/google', (req,res)=>{
    res.send("Google login screen will be here");
})



module.exports = router;