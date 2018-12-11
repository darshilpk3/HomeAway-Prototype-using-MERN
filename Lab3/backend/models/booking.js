var mongoose = require('mongoose')


var bookingSchema = mongoose.Schema({
    booking_from:{
        type:String,
        //required:true,
    },
    booking_to:{
        type:String,
        //required:true
    },
    guests: {
        type: Number,
        //required:true,
        min:1
    },
    property:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    },
    traveler:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Traveler'
    }
})

module.exports = mongoose.model('Booking',bookingSchema)