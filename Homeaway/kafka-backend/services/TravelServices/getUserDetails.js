var Traveler = require('../../models/traveler')

function handle_request(msg, callback){
    console.log("Inside edituserdetails kafka backend");
    console.log(msg.travelid);
    Traveler.findById(msg.travelid).exec()
        .then(result => {
            callback(null, result);
        })
        .catch(err => {
            callback(err,err)
        })
    console.log("after callback");
};

exports.handle_request = handle_request;