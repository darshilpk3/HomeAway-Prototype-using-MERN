var mongoose = require('mongoose')

var travelerSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firstname: {
        type: String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    company:String,
    number:{
        type:Number,
        min : 10,
        max: 10
    },
    address: String,
    school: String,
    aboutme:String,
    languages: String,
    gender:{
        type:String
    },
    profilePic:String,
    bookings: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Booking'
        }
    ]
})

module.exports = mongoose.model('Traveler',travelerSchema)