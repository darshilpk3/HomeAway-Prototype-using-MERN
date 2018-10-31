var mongoose = require('mongoose')


var ownerSchema = mongoose.Schema({
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
    billing_address: String,
    city:String,
    state:String,
    zipcode:String,
    country:String,
    properties: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref :'Property'
        }
    ],
    bookings: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Booking'
        }
    ]
})

module.exports = mongoose.model('Owner',ownerSchema)