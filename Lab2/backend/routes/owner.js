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
var Question = require('../models/question')
var Owner = require('../models/owner')
var Property = require('../models/property')
var Booking = require('../models/booking')
var kafka = require('../kafka/client')

router.get("/:ownerid", function (req, res, next) {
    console.log("getting details of user having id: " + req.params.ownerid)
    kafka.make_request("getOwnerDetails",req.params,function(err,result){
        if(err){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Couldnt fetch data")
        }else if(result.message){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Couldnt fetch data")
        }else{
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(result))
        }
    })
})


router.put("/:ownerid/editpassword", function (req, res, next) {
    console.log("changing owner details")
    
    const requestData = {
        "password" : bcrypt.hashSync(req.body.password, 10),
        "ownerid" : req.params.ownerid
    }

    kafka.make_request("editOwnerPassword",requestData,function(err,result){
       if(err){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("something wrong with data while changing password")
       }else if(result.message){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("something wrong with data while changing password")
       }else{
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Successfully updated") 
       }
    })
})

router.put("/:ownerid", function (req, res, next) {
    console.log("changing owner details")
    const requestData = {
        "email": req.body.email,
        "firstname" : req.body.firstname,
        "lastname" : req.body.lastname,
        "company" : req.body.company,
        "address" : req.body.address,
        "city" : req.body.city,
        "state" : req.body.state,
        "zipcode" : req.body.zipcode,
        "country" : req.body.country,
        "number" : req.body.number,
        "ownerid" : req.params.ownerid
    }

    kafka.make_request("editOwnerDetails",requestData,function(err,result){
        if(err){    
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("something wrong with data while entering details")
        }else if(result.message){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("something wrong with data while entering details")
        }else{
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end(JSON.stringify(result))
        }
    })
})

router.get("/:owner_id/property/", async (req, res, next) => {
    console.log("Trying to get properties listed by owner id: ", req.params.owner_id)

    kafka.make_request("getOwnerProperties",req.params,function(err,result){
        if(err){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Couldn't get properties")
        }else if(result.message){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Couldn't get properties")
        }else{
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(result))
        }
    })
})


router.get("/:owner_id/dashboard", function (req, res, next) {
    console.log("Trying to fetch booking details")

    kafka.make_request("getOwnerBookings",req.params,function(err,result){
        if(err){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end(JSON.stringify(err))
        }else if(result.message){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end(JSON.stringify(result))
        }else{
            console.log("Got the booking data for ",req.params.owner_id)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(result))
        }
    })
})


router.post("/:ownerid/question", function (req, res, next) {
    console.log("Asking a question")
    const requestData = {
        "_id" : req.body._id,
        "answer" : req.body.answer,
        "ownerid" : req.params.ownerid
    }

    kafka.make_request("postOwnerAnswer",requestData,function(err,result){
        if(err){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end("unable to record the answer")
        }else if(result.message){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end("unable to record the answer")
        }else{
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(result))
        }
    })
})

router.get("/:ownerid/question", function (req, res, next) {
    console.log("getting questions")

    kafka.make_request("getOwnerInbox",req.params,function(err,result){
        if(err){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(err))
        }else if(result.message){
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(result))
        }else{
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(result))
        }
    })
})

module.exports = router
