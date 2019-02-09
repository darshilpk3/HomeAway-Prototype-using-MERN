var Traveler = require('../../models/traveler')
var Booking = require('../../models/booking')
var Property = require('../../models/property')
var Owner = require('../../models/owner')
var Question = require('../../models/question')


function handle_request(msg, callback){
    console.log("Inside getOwnerDetails kafka backend");
    
    Owner.findOne({
        properties: msg._id
      }, { "_id": 1 }).exec()
        .then(owner => {
          //console.log(owner)
          var booking = new Booking({
            booking_from: msg.booking_from,
            booking_to: msg.booking_to,
            guests: msg.guests,
            property: msg._id,
            traveler: msg.travel_id,
            owner: owner._id
          })
          booking.save()
            .then(result => {
              Property.findByIdAndUpdate(msg._id, {
                $push: {
                  bookings: result._id
                }
              }).exec()
              Traveler.findByIdAndUpdate(msg.travel_id, {
                $push: {
                  bookings: result._id
                }
              }).exec()
              Owner.findByIdAndUpdate(owner._id, {
                $push: {
                  bookings: result._id,
                },
              }).exec()
              Property.findByIdAndUpdate(msg._id, {
                $pull: { dates: { $in: msg.range } }
              }).exec()
              callback(null,result)
            })
        })
        .catch(err => {
          //console.log(err)
          callback(err,err)
        })

    console.log("after callback");
};

exports.handle_request = handle_request;