var Owner = require('../../models/owner')

function handle_request(msg, callback){
    console.log("Inside editOwnerPassword kafka backend");
    
    Owner.findByIdAndUpdate(msg.ownerid, {
        $set: {
            password: msg.password
        }
    }).exec()
        .then(result => {
            callback(null,result)
        })
        .catch(err => {
            callback(err,err)
        })

    console.log("after callback");
};

exports.handle_request = handle_request;