var express = require('express');
var router = express.Router();
var path = require('path')
var bcrypt = require('bcryptjs')
var Traveler = require('../models/traveler')
var jwt = require('jsonwebtoken')
var passport = require('passport')
var kafka = require('../kafka/client');



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
        if(err == "Email-Id already exist"){
            console.log("Email Id error")
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Email-Id already exist")
        }else if(err == "Error in Profile Section Data"){
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Error in Profile Section Data")
        }else if(err){
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
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results))   
        }
    })
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
            res.end("something wrong with password")
        }else if(results.message){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("something wrong with password")
        }else{
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results))
        }
    })
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
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results))
        }
    })
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
})

router.get("/:travelid/question", function (req, res, next) {
    console.log("getting questions")
    console.log("Travel id: ",req.params.travelid)
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
})

module.exports = router