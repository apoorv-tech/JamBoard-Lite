const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('Jamboard/index')
})



module.exports =  router