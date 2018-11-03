var connection =  new require('./kafka/Connection');
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/homeaway',{
    poolSize:100
  })
    .then(() => console.log("Connected"))
    .catch((err) => console.log(err))
//topics files
//var signin = require('./services/signin.js');
//var Books = require('./services/books.js');
var Login = require('./services/TravelServices/login')
var GetUserDetails = require('./services/TravelServices/getUserDetails.js')
var EditUserDetails = require('./services/TravelServices/editUserDetails.js')
var EditUserPassword = require('./services/TravelServices/editUserPassword.js')
var GetUserBookings = require('./services/TravelServices/getUserBookings.js')
var GetUserInbox = require('./services/TravelServices/getUserInbox.js')
var PostUserQuestion = require('./services/TravelServices/postUserQuestion.js')

var GetOwnerDetails = require('./services/OwnerServices/getOwnerDetails.js')
var EditOwnerDetails = require('./services/OwnerServices/editOwnerDetails.js')
var EditOwnerPassword = require('./services/OwnerServices/editOwnerPassword.js')
var GetOwnerProperties = require('./services/OwnerServices/getOwnerProperties.js')
var GetOwnerBookings = require('./services/OwnerServices/getOwnerBookings.js')
var GetOwnerInbox = require('./services/OwnerServices/getOwnerInbox.js')
var PostOwnerAnswer = require('./services/OwnerServices/postOwnerAnswer.js')

var SearchProperties = require('./services/PropertyServices/searchProperties.js')
var AddProperty = require('./services/PropertyServices/addProperty.js')
var EditPropertyDetails = require('./services/PropertyServices/editPropertyDetails.js')
var BookProperty = require('./services/PropertyServices/bookProperty.js')
var GetPropertyDetails = require('./services/PropertyServices/getPropertyDetails.js')

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_book",Books)
handleTopicRequest("post_login",Login)
handleTopicRequest("getUserDetails",GetUserDetails)
handleTopicRequest("editUserDetails",EditUserDetails)
handleTopicRequest("editUserPassword",EditUserPassword)
handleTopicRequest("getUserBookings",GetUserBookings)
handleTopicRequest("getUserInbox",GetUserInbox)
handleTopicRequest("postUserQuestion",PostUserQuestion)

handleTopicRequest("getOwnerDetails",GetOwnerDetails)
handleTopicRequest("editOwnerDetails",EditOwnerDetails)
handleTopicRequest("editOwnerPassword",EditOwnerPassword)
handleTopicRequest("getOwnerProperties",GetOwnerProperties)
handleTopicRequest("getOwnerBookings",GetOwnerBookings)
handleTopicRequest("getOwnerInbox",GetOwnerInbox)
handleTopicRequest("postOwnerAnswer",PostOwnerAnswer)

handleTopicRequest("searchProperties",SearchProperties)
handleTopicRequest("addProperty",AddProperty)
handleTopicRequest("editPropertyDetails",EditPropertyDetails)
handleTopicRequest("bookProperty",BookProperty)
handleTopicRequest("getPropertyDetails",GetPropertyDetails)