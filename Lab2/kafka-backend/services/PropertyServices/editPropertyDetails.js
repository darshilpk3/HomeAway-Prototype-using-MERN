var Traveler = require('../../models/traveler')
var Booking = require('../../models/booking')
var Property = require('../../models/property')
var Owner = require('../../models/owner')
var Question = require('../../models/question')


function handle_request(msg, callback){
    console.log("Inside getOwnerDetails kafka backend");
    
    Property.findByIdAndUpdate(msg.property_id, {
        $set: {
          place_name: msg.place_name,
          location_city: msg.location_city,
          street: msg.street,
          apt: msg.apt,
          state: msg.state,
          zipcode: msg.zipcode,
          country: msg.country,
          bedrooms: msg.bedrooms,
          bathrooms: msg.bathrooms,
          accomodates: msg.accomodates,
          headline: msg.headline,
          description: msg.description,
          price: msg.price,
          available_from: msg.available_from,
          available_to: msg.available_to,
          dates: msg.range
        }
      }).exec()
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