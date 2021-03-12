const mongoose = require('mongoose');

const JamboardSchema = new mongoose.Schema({
    owner : {
        type :  mongoose.Schema.Types.ObjectId
    },
    name : {
        type : String,
        required : true
    },
    data : [
       {
           type : Object
       }
    ],
    users : [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})

module.exports = mongoose.model('Jamboard', JamboardSchema);