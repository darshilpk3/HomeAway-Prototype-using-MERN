var Owner = require('../../models/owner')

function handle_request(msg, callback){
    console.log("Inside getOwnerDetails kafka backend");
    
    Owner.findById(msg.ownerid).exec()
        .then(result => {
            callback(null,result)
        })
        .catch(err => {
            callback(err,err)
        })

    console.log("after callback");
};

exports.handle_request = handle_request;