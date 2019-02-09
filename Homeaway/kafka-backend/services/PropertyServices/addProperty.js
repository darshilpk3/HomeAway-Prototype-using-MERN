var Traveler = require('../../models/traveler')
var Booking = require('../../models/booking')
var Property = require('../../models/property')
var Owner = require('../../models/owner')
var Question = require('../../models/question')


function handle_request(msg, callback){
    console.log("Inside getOwnerDetails kafka backend");
    
    var property = new Property({
        place_name: msg.place_name,
        headline: msg.headline,
        description: msg.description,
        street: msg.street,
        apt: msg.apt,
        location_city: msg.location_city,
        state: msg.state,
        zipcode: msg.zipcode,
        country: msg.country,
        available_from: msg.available_from,
        available_to: msg.available_to,
        bedrooms: msg.bedrooms,
        bathrooms: msg.bathrooms,
        accomodates: msg.accomodates,
        price: msg.price,
        dates: msg.range
      })
    
      property.save()
        .then(result => {
          Owner.findByIdAndUpdate(msg.owner_id, { $push: { properties: result._id } }).exec()
            .then(result2 => {
              //console.log(result2)
              callback(null,result)
            })
            .catch(err => {
                callback(err,err)
            })
        })
        .catch(err => {
            callback(err,err)
        })
    
    console.log("after callback");
};

exports.handle_request = handle_request;