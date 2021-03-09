const express = require('express')
const {requireauth} = require("../../middleware/authmiddleware")
const User = require('../../models/user')
const User2 = require('../../models/user2')
const Jamboard = require('../../models/jamboard')
const router = express.Router()


router.get('/',requireauth,async (req,res)=>{
    console.log(req.query._id)
    console.log(req.query._uid)
    const allusers = await User.find({})
    const allusers2 = await User2.find({})
    res.render('Jamboard/index',{
        fileused: "Jamboard",
        users : allusers,
        users2 : allusers2,
        jambaord_id : req.query._id,
        userid : req.query._uid
    })
})
router.get('/clear',requireauth,async (req,res)=>{
    // console.log(req.query._id)
    // console.log(req.query._uid)

    await Jamboard.findOne({ _id: req.query._id }).then(async (jam)=>{
        //console.log(jam.data)
        let points = jam.data
    
        points=[]
        try {
         const result = await Jamboard.updateOne({'_id' : req.query._id},{$set: { 'data' : points}},function(err,res){
             if(err) throw err
             
         }).
         then(async ()=>{
          
            res.redirect('/jamboard?_id='+req.query._id+'&_uid='+req.query._uid)
             

         }
         
         )
        } catch (error) {
            console.log(error);
        }
        
     })
 
    
    
})
router.post('/',requireauth,async (req,res)=>{
    console.log(req.body.add)
    const jam = await Jamboard.findOne({_id : req.query})
    let users = []
    let user = await User.findOne({email : req.body.add})
    if(user)
    {
        users = jam.users
        users.push(user._id)
        Jamboard.updateOne({'_id' : req.query._id},{$set: { 'users' : users}},function(err,res){
            if(err) throw err
        })
    }
    else {
        user = await User2.findOne({mail : req.body.add})
        users = jam.users
        users.push(user._id)
        Jamboard.updateOne({'_id' : req.query._id},{$set: { 'users' : users}},function(err,res){
            if(err) throw err
        })
    }
    res.redirect('/jamboard?_id='+req.query._id+'&_uid='+req.query._uid)
})

module.exports =  router