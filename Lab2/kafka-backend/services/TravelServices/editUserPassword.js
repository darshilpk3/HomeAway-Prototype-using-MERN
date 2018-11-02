var Traveler = require('../../models/traveler')

function handle_request(msg, callback) {
    console.log("changing user password under editUserPassword kafka request")

    Traveler.findByIdAndUpdate(msg.travelid, {
        $set: {
            password: msg.password
        }
    }).exec()
        .then(result => {
            callback(null,result)
        })
        .catch(error => {
            console.log(error)
            callback(error,error)
        })
    console.log("after callback");
};

exports.handle_request = handle_request;