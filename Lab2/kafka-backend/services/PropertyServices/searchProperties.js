var Traveler = require('../../models/traveler')
var Booking = require('../../models/booking')
var Property = require('../../models/property')
var Owner = require('../../models/owner')
var Question = require('../../models/question')


function handle_request(msg, callback){
    console.log("Inside getOwnerDetails kafka backend");
    
    Property.find({
        available_from: { $lte: msg.available_from },
        available_to: { $gte: msg.available_to },
        accomodates: { $gte: msg.accomodates },
        location_city: { $regex: new RegExp('^' + msg.place, 'i') },
        dates: { $in: msg.range }
      })
        .then(result => {
          //console.log(result)
          callback(null,result)
        })
        .catch(err => {
          console.log(err)
          callback(err,err)
        })

    console.log("after callback");
};

exports.handle_request = handle_request;