var mongoose = require('mongoose')


var questionSchema = mongoose.Schema({
    travel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Traveler'
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    },
    property:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    topic:String,
    question:String,
    answer:String
})

module.exports = mongoose.model('Question',questionSchema)