const mongoose = require('mongoose');

const JamboardSchema = new mongoose.Schema({
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