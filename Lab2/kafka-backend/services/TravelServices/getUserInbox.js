var Traveler = require('../../models/traveler')
var Booking = require('../../models/booking')
var Property = require('../../models/property')
var Owner = require('../../models/owner')
var Question = require('../../models/question')

function handle_request(msg, callback) {

    console.log("getting user inbox under getUserInbox kafka request")
    console.log(msg.travelid)
    Question.find({
        travel: msg.travelid
    })
        .populate('travel')
        .populate('property')
        .populate('owner')
        .exec()
        .then(result => {
            console.log(result)
            callback(null,result)
        })
        .catch(err => {
            console.log(err)
            callback(err,err)
        })

    console.log("after callback");
};

exports.handle_request = handle_request;