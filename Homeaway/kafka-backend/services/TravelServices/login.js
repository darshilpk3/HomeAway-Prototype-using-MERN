var Traveler = require('../../models/traveler')

function handle_request(msg, callback){
   
    console.log("Inside login kafka backend");
    console.log(msg);
    const email = msg.email
    const password = msg.password
    Traveler.findOne({
        email:email
    }).exec()
        .then(result => {
            callback(null, result);
        })
        .catch(err => {
            callback(err,err)
        })
    console.log("after callback");
};

exports.handle_request = handle_request;