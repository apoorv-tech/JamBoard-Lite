const mongoose = require('mongoose');

const JamboardSchema = new mongoose.Schema({
    data : [
        {
            point: {
                x: {
                    type : Number
                },
                y: {
                    type: Number
                }
            }
        }
    ],
    users : [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})

module.exports = mongoose.model('Jamboard', JamboardSchema);