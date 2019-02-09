var Owner = require('../../models/owner')

function handle_request(msg, callback){
    console.log("Inside editOwnerPassword kafka backend");
    
    Owner.findByIdAndUpdate(msg.ownerid, {
        $set: {
            email: msg.email
        }
    }).exec()
        .then(result => {
            Owner.findByIdAndUpdate(msg.ownerid, {
                $set: {
                    firstname: msg.firstname,
                    lastname: msg.lastname,
                    company: msg.company,
                    billing_address: msg.address,
                    city: msg.city,
                    state: msg.state,
                    zipcode: msg.zipcode,
                    country: msg.country,
                    number: msg.number
                }
            })
                .then(result => {
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