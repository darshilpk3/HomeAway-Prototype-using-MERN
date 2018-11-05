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
                    //console.log("result: ",result)
                    callback(null,result)
                })
                .catch(err => {
                    //console.log("err type: ",typeof err)
                    callback(err,"Error in Profile Section Data")
                })
        })
        .catch(err => {
            //console.log("err type is: ",typeof err)
            callback(err,"Email-Id already exist")
        })
    console.log("after callback");
};

exports.handle_request = handle_request;