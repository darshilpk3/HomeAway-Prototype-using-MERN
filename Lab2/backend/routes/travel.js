var express = require('express');
var router = express.Router();
var pool = require('../pool');
var mysql = require('mysql');
var md5 = require('md5');
var path = require('path')
var multer = require('multer')
var bcrypt = require('bcryptjs')
var cookieParser = require('cookie-parser')
var Traveler = require('../models/traveler')
var Owner = require('../models/owner')
var Property = require('../models/property')
var Booking = require('../models/booking')
var Question = require('../models/question')
var jwt = require('jsonwebtoken')
var passport = require('passport')
var kafka = require('../kafka/client');


// router.post('/login', function (req, res, next) {

//     console.log("Inside Login Post Request");
//     var email = req.body.email;
//     var password = (req.body.password);
//     console.log(email, password)
//     Traveler.findOne({ email: email })
//         .exec()
//         .then(result => {
//             //console.log(result)
//             if (bcrypt.compareSync(password, result.password)) {
//                 var token = jwt.sign({userid:result._id}, 'secretToken', {
//                     expiresIn: 60*60*24
//                 });
//                 req.session.user = result;
//                 res.cookie("loginuser",result._id.toString(), {
//                     maxAge: 900000,
//                     httpOnly: false,
//                     path: '/'
//                 })
//                 res.cookie("loginemail",result.email, {
//                     maxAge: 900000,
//                     httpOnly: false,
//                     path: '/',
//                     overwrite: true
//                 })
//                 res.cookie("token",token,{
//                     maxAge: 900000,
//                     httpOnly: false,
//                     path: '/',
//                     overwrite: true
//                 })
//                 const jsonResponse = {
//                     "_id" : result._id,
//                     "email" : result.email,
//                     "token" : token,
//                 }
//                 res.writeHead(200, {
//                     'Content-Type': 'application/json'
//                 })
//                 res.end(JSON.stringify(jsonResponse));
//             }
//         })
//         .catch( err => {
//             console.log(err)
//         })
// });


// router.post('/login',function(req,res,next){
    // kafka.make_request('post_login',req.body, function(err,results){
    //     if(err){
    //         console.log(err)
    //         res.writeHead(400,{
    //             'Content-Type':'text/plain'
    //         })
    //         res.end(err)
    //     }else{
    //         res.writeHead(200,{
    //             'Content-Type':'application/json'
    //         })
    //         res.end(JSON.stringify(results))
    //     }
    // })
// })




// router.post('/signup', function (req, res, next) {
//     console.log("Inside signup Post Request");
//     var email = req.body.email;
//     var password = bcrypt.hashSync(req.body.password, 10);
//     var firstname = req.body.firstname;
//     var lastname = req.body.lastname;

//     var traveler = new Traveler({
//         firstname:firstname,
//         lastname:lastname,
//         email:email,
//         password:password
//     })
//     traveler.save()
//         .then(result => {
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Successful added");
//         })
//         .catch(err=>{
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Something wrong with data"); 
//         })
// })


// router.use(function(req,res,next){
//     var token = req.body.token || req.query.token || req.headers['x-access-token']
//     if(token){
//         jwt.verify(token,'secretToken',function(err,decoded){
//             if(err){
//                 res.writeHead(400, {
//                     'Content-Type': 'text/plain'
//                 })
//                 res.end("Wrong token provided")
//             }
//             else{
//                 next();
//             }
//         })
//     }else{
//         res.writeHead(400, {
//             'Content-Type': 'text/plain'
//         })
//         res.end("No token provided")
//     }
// })

// router.get("/:travelid", function (req, res, next) {
//     console.log("getting details of user having id: " + req.params.travelid)
    // Traveler.findById(req.params.travelid).exec()
    //     .then(result => {
    //         res.writeHead(200, {
    //             'Content-Type': 'application/json'
    //         })
    //         res.end(JSON.stringify(result))
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("Couldnt fetch data")
    //     })
// })

router.get("/:travelid", function (req, res, next) {
    kafka.make_request('getUserDetails',req.params, function(err,results){
        if(err){
            console.log(err)
            res.writeHead(200,{
                'Content-Type':'text/plain'
            })
            res.end(err)
        }else{
            res.writeHead(200,{
                'Content-Type':'application/json'
            })
            res.end(JSON.stringify(results))
        }
    })
})


router.put("/:travelid", function (req, res, next) {
    console.log("changing user details")
    const requestData = {
        "email" : req.body.email,
        "firstname" : req.body.firstname,
        "lastname" : req.body.lastname,
        "school" : req.body.school,
        "company" : req.body.company,
        "address" : req.body.address,
        "number" : req.body.number,
        "aboutme" : req.body.aboutme,
        "languages" : req.body.languages,
        "gender" : req.body.gender,
        "travelid" : req.params.travelid
    }
    kafka.make_request('editUserDetails',requestData,function(err,results){
        console.log("result is: ",results)
        if(err){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("something wrong with data while entering other details")
        }else if(results.message) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("something wrong with data while entering other details")
        }else{
            res.cookie("loginemail", requestData.email, {
                maxAge: 900000,
                httpOnly: false,
            })
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Successfully updated")   
        }
    })
    // Traveler.findByIdAndUpdate(req.params.travelid, {
    //     $set: {
    //         email: email
    //     }
    // }).exec()
    //     .then(result => {
    //         console.log(result)
    //         Traveler.findByIdAndUpdate(req.params.travelid, {
    //             $set: {
    //                 firstname: firstname,
    //                 lastname: lastname,
    //                 school: school,
    //                 company: company,
    //                 address: address,
    //                 number: number,
    //                 aboutme: aboutme,
    //                 languages: languages,
    //                 gender: gender
    //             }
    //         }).exec()
    //             .then(result => {
    //                 res.cookie("loginemail", email, {
    //                     maxAge: 900000,
    //                     httpOnly: false,
    //                 })
    //                 res.writeHead(200, {
    //                     'Content-Type': 'text/plain'
    //                 })
    //                 res.end("Successfully updated")
    //             })
    //             .catch(err => {
    //                 res.writeHead(400, {
    //                     'Content-Type': 'text/plain'
    //                 })
    //                 res.end("something wrong with data while entering other details")
    //             })
    //     })
    //     .catch(err => {
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("Email already in use entering other details")
    //     })
})

router.put("/editpassword/:travelid", function (req, res, next) {
    console.log("changing user details")
    const requestData = {
        "password":bcrypt.hashSync(req.body.password, 10),
        "travelid":req.params.travelid
    }
    kafka.make_request('editUserPassword',requestData,function(err,results){
        if(err){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("something wrong with data")
        }else if(results.message){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("something wrong with data")
        }else{
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Successfully updated")
        }
    })
    // Traveler.findByIdAndUpdate(req.params.travelid, {
    //     $set: {
    //         password: password
    //     }
    // }).exec()
    //     .then(result => {
    //         res.writeHead(200, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("Successfully updated")
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("something wrong with data while entering email and ")
    //     })
})


router.get("/:travel_id/bookingdetails", function (req, res, next) {
    console.log("Trying to fetch booking details")
    kafka.make_request('getUserBookings',req.params,function(err,results){
        if(err){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("error fetching bookings")
        }else if(results.message){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("error fetching bookings")
        }else{
            console.log(results[0].booking_from)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results))
        }
    })
    // Booking.find({ traveler: req.params.travel_id })
    //     .populate('property')
    //     .populate('owner')
    //     .populate('traveler')
    //     .exec()
    //     .then(result => {
    //         console.log(JSON.stringify(result))
    //         res.writeHead(200, {
    //             'Content-Type': 'application/json'
    //         })
    //         res.end(JSON.stringify(result))
    //     })
    //     .catch(err => {
    //         console.log(err)
              
    //     })

})

router.post("/:travelid/upload", function (req, res, next) {
    console.log("trying to upload a file");
    console.log(req.body.email)
    let imageFile = req.files.selectedFile
    console.log(imageFile.name);
    imageFile.mv(`./public/uploads/userprofile-${req.params.travelid}${path.extname(imageFile.name)}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        } else {
            Traveler.findByIdAndUpdate(req.params.travelid, {
                $set: {
                    profilePic: `/public/uploads/userprofile-${req.params.travelid}${path.extname(imageFile.name)}`
                }
            }).exec()
                .then(result => {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    console.log(`public/uploads/userprofile-${req.params.travelid}${path.extname(imageFile.name)}`)
                    res.end(`public/uploads/userprofile-${req.params.travelid}${path.extname(imageFile.name)}`)
                })
                .catch(err => {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    res.end(err)
                })
        }
    })
})


router.post("/:travelid/question", function (req, res, next) {
    console.log("Asking a question")
    const requestData = {
        "_id" : req.body._id,
        "topic" : req.body.topic,
        "question" : req.body.question,
        "travelid" : req.params.travelid
    }
    
    kafka.make_request('postUserQuestion',requestData,function(err,results){
        if(err){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end("error posting question")
        }else if(results.message){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end("error posting question")
        }else{
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(results))
        }
    })
    // Owner.findOne({
    //     properties: _id
    // }, { "_id": 1 }).exec()
    //     .then(result => {
    //         console.log(result._id)
    //         var questionDocument = new Question({
    //             travel: req.params.travelid,
    //             property: _id,
    //             owner: result._id,
    //             topic: topic,
    //             question: question
    //         })
    //         questionDocument.save()
    //             .then(result => {
    //                 console.log(result)
    //                 res.writeHead(200, {
    //                     'Content-Type': 'application/json'
    //                 });
    //                 res.end(JSON.stringify(result))
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     })
    //     .catch(err => {
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         });
    //         res.end(err)
    //     })
})

router.get("/:travelid/question", function (req, res, next) {
    console.log("getting questions")

    kafka.make_request('getUserInbox',req.params,function(err,results){
        if(err){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end("Error getting user inbox")
        }else if(results.message){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end("Error getting user inbox")
        }else{
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(results))
        }
    })
    // Question.find({
    //     travel: req.params.travelid
    // })
    //     .populate('travel')
    //     .populate('property')
    //     .populate('owner')
    //     .exec()
    //     .then(result => {
    //         console.log(result)
    //         res.writeHead(200, {
    //             'Content-Type': 'application/json'
    //         });
    //         res.end(JSON.stringify(result))
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
})

module.exports = router