const express = require('express')
const {requireauth} = require("../../middleware/authmiddleware")
const Jamboard = require('../../models/jamboard')
const router = express.Router()

let userid


router.get('/',requireauth,(req,res)=>{
    userid = res.locals.user._id
    if(req.query._id == null)
    {
        res.redirect(('/dashboard?_id='+userid));
    }
    else
    {
        if(req.query._id != userid)
        {
            res.redirect(('/dashboard?_id='+userid));
        }else {
            res.render('Jamboard/dashboard')
        }
    }
})


router.get('/new',async (req,res)=>{
    const jamboard = new Jamboard({
        data : [],
        users : [userid]
    })
    try {
        const newJamboard = await jamboard.save()
        res.redirect('/jamboard?_id='+newJamboard._id)
    } catch (error) {
        console.log(error)
    }
})


module.exports =  router