function handle_request(msg, callback){
   
    console.log("Inside login kafka backend");
    console.log(msg);
    callback(null, msg);
    console.log("after callback");
};

exports.handle_request = handle_request;