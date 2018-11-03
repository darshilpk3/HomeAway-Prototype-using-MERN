var Traveler = require('../../models/traveler')
var Booking = require('../../models/booking')
var Property = require('../../models/property')
var Owner = require('../../models/owner')
var Question = require('../../models/question')


function handle_request(msg, callback){
    console.log("Inside getOwnerDetails kafka backend");
    
    Property.findById(msg.propertyid).exec()
    .then(result => {
      callback(null,result)
    })
    .catch(err => {
      callback(err,err)
    })
    console.log("after callback");
};

exports.handle_request = handle_request;