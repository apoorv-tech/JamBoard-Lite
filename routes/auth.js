const express = require('express');
const router = express.Router();
const passport = require('passport')
const path = require('path');
router.get('/google', passport.authenticate('google', {scope:['profile','email']}))

router.get('/google/callback', passport.authenticate("google", {
    failureRedirect:'/login'
}), (req,res)=>{
    res.redirect(('/jamboard'));
})

module.exports= router;