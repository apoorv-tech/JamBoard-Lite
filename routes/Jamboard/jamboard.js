const express = require('express')
const {requireauth} = require("../../middleware/authmiddleware")
const router = express.Router()


router.get('/',requireauth,(req,res)=>{
    res.render('Jamboard/index',{
        fileused: "Jamboard"
    })
})

module.exports =  router