var Traveler = require('../../models/traveler')
var Booking = require('../../models/booking')
var Property = require('../../models/property')
var Owner = require('../../models/owner')
var Question = require('../../models/question')

function handle_request(msg, callback) {
    
    console.log("posting user question under postUserQuestion kafka request")

    Owner.findOne({
        properties: msg._id
    }, { "_id": 1 }).exec()
        .then(result => {
            console.log(result._id)
            var questionDocument = new Question({
                travel: msg.travelid,
                property: msg._id,
                owner: result._id,
                topic: msg.topic,
                question: msg.question
            })
            questionDocument.save()
                .then(result => {
                    callback(null,result)
                })
                .catch(error => {
                    console.log(error)
                    callback(error,error)
                })
        })
        .catch(error => {
            callback(error,error)
        })
    
    console.log("after callback");
};

exports.handle_request = handle_request;