var Traveler = require('../../models/traveler')
var Booking = require('../../models/booking')
var Property = require('../../models/property')
var Owner = require('../../models/owner')
function handle_request(msg, callback) {
    
    console.log("getting user bookings under getUserBookings kafka request")

    Booking.find({ traveler: msg.travel_id })
        .populate('property')
        .populate('owner')
        .populate('traveler')
        .exec()
        .then(result => {
            callback(null,result)
        })
        .catch(err => {
            //console.log(err)
            callback(err,err)  
        })
    console.log("after callback");
};

exports.handle_request = handle_request;