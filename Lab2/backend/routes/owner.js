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


router.post('/login', function (req, res, next) {

    console.log("Inside Login Post Request");
    var email = req.body.email;
    var password = req.body.password;
    console.log(email, password)
    Owner.findOne({ email: email }).exec()
        .then(result => {
            console.log("owner_id: ", result._id)
            req.session.user = result;
            res.cookie("ownerlogin", result._id.toString(), {
                maxAge: 900000,
                httpOnly: false,
                path: '/'
            })
            res.cookie("owneremail", result.email, {
                maxAge: 900000,
                httpOnly: false,
                path: '/',
                overwrite: true
            })
            const jsonResponse = {
                "_id" : result._id,
                "email" : result.email
            }
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end(JSON.stringify(jsonResponse));
        })
        .catch(err => {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials");
        })
});


router.post('/signup', function (req, res, next) {
    console.log("Inside signup Post Request");
    var email = req.body.email;
    var password = bcrypt.hashSync(req.body.password);
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    var owner = new Owner({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
    })

    owner.save()
        .then(result => {
            console.log(result)
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Successful added");
        })
        .catch(err => {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Something wrong with data");
        })
})


router.get("/:ownerid", function (req, res, next) {
    console.log("getting details of user having id: " + req.params.ownerid)
    Owner.findById(req.params.ownerid).exec()
        .then(result => {
            console.log(JSON.stringify(result))
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(result))
        })
        .catch(err => {
            console.log(err)
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Couldnt fetch data")
        })
})


router.put("/:ownerid/editpassword", function (req, res, next) {
    console.log("changing owner details")
    var password = bcrypt.hashSync(req.body.password, 10);

    Owner.findByIdAndUpdate(req.params.ownerid, {
        $set: {
            password: password
        }
    }).exec()
        .then(result => {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Successfully updated")
        })
        .catch(err => {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("something wrong with data while entering email and " + sql)
        })
})

router.put("/:ownerid", function (req, res, next) {
    console.log("changing owner details")
    var email = req.body.email;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var company = req.body.company;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zipcode = req.body.zipcode;
    var country = req.body.country;
    var number = req.body.number;

    try {
        Owner.findByIdAndUpdate(req.params.ownerid, {
            $set: {
                email: email
            }
        }).exec()
            .then(result => {
                Owner.findByIdAndUpdate(req.params.ownerid, {
                    $set: {
                        firstname: firstname,
                        lastname: lastname,
                        company: company,
                        billing_address: address,
                        city: city,
                        state: state,
                        zipcode: zipcode,
                        country: country,
                        number: number
                    }
                }).then(result => {
                    res.cookie("owneremail", email, {
                        maxAge: 900000,
                        httpOnly: false,
                    })
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successfully updated")
                })
            })
    } catch (err) {
        console.log(err)
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.end("something wrong with data while entering other details")
    }
})

router.get("/:owner_id/property/", async (req, res, next) => {
    console.log("Trying to get properties listed by owner id: ", req.params.owner_id)
    Owner.findById(req.params.owner_id)
        .exec()
        .then(result => {
            console.log(result.properties)
            Property.find({
                _id: { $in: result.properties }
            }).exec()
                .then(result => {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    //console.log(JSON.stringify(result))
                    res.end(JSON.stringify(result))
                })
        })
        .catch(err => {
            console.log(err)
        })
})


router.get("/:owner_id/dashboard", function (req, res, next) {
    console.log("Trying to fetch booking details")
    Booking.find({ owner: req.params.owner_id })
        .populate('property')
        .populate('traveler')
        .populate('owner')
        .exec()
        .then(result => {
            //console.log(JSON.stringify(result)) 
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(result))
        })
        .catch(err => {
            console.log(err)
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end(JSON.stringify(err))
        })
})


router.post("/:ownerid/question", function (req, res, next) {
    console.log("Asking a question")
    var _id = req.body._id
    var answer = req.body.answer
    console.log(_id, " ", answer)

    Question.findByIdAndUpdate(_id, {
        $set: {
            answer: answer
        }
    }).exec()
        .then(result => {
            //console.log(result)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(result))
        })
        .catch(err => {

        })
})

router.get("/:ownerid/question", function (req, res, next) {
    console.log("getting questions")

    Question.find({
        owner: req.params.ownerid
    })
        .populate('traveler')
        .populate('property')
        .populate('owner')
        .exec()
        .then(result => {
            //console.log(result)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(result))
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router
