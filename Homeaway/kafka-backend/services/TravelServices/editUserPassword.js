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
        .catch(err => {
            //console.log(err)
            callback(err,err)
        })
    console.log("after callback");
};

exports.handle_request = handle_request;