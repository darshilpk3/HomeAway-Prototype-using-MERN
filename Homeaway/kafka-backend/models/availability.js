var mongoose = require('mongoose')


var availabilitySchema = mongoose.Schema({
    date:{
        type:Date,
        required:true,
    },
    booking_to:{
        type:Date,
        required:true
    },
    guests: {
        type: Number,
        required:true,
        min:1
    }
})

module.exports = mongoose.model('Booking',bookingSchema)