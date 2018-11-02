var Traveler = require('../../models/traveler')

function handle_request(msg, callback) {
    console.log("Inside edituserdetails kafka backend");
    console.log(msg.travelid);
    Traveler.findByIdAndUpdate(msg.travelid, {
        $set: {
            email: msg.email
        }
    }).exec()
        .then(result => {
            console.log(result)
            Traveler.findByIdAndUpdate(msg.travelid, {
                $set: {
                    firstname: msg.firstname,
                    lastname: msg.lastname,
                    school: msg.school,
                    company: msg.company,
                    address: msg.address,
                    number: msg.number,
                    aboutme: msg.aboutme,
                    languages: msg.languages,
                    gender: msg.gender
                }
            }).exec()
                .then(result => {
                    console.log("result: ",result)
                    callback(null,result)
                })
                .catch(error => {
                    console.log("err type: ",typeof error)
                    callback(error,error)
                })
        })
        .catch(error => {
            console.log("err type is: ",typeof error)
            callback(error,error)
        })
    console.log("after callback");
};

exports.handle_request = handle_request;