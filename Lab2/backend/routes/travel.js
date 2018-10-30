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

router.post('/login', function (req, res, next) {

    console.log("Inside Login Post Request");
    var email = req.body.email;
    var password = (req.body.password);
    console.log(email, password)
    Traveler.findOne({ email: email })
        .exec()
        .then(result => {
            console.log(result)
            if (bcrypt.compareSync(password, result.password)) {
                var token = jwt.sign({userid:result._id}, 'secretToken', {
                    expiresIn: 60*60*24
                });
                req.session.user = result;
                res.cookie("loginuser",result._id.toString(), {
                    maxAge: 900000,
                    httpOnly: false,
                    path: '/'
                })
                res.cookie("loginemail",result.email, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: '/',
                    overwrite: true
                })
                res.cookie("token",token,{
                    maxAge: 900000,
                    httpOnly: false,
                    path: '/',
                    overwrite: true
                })
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                res.end(JSON.stringify(result));
            }
        })
        .catch( err => {
            console.log(err)
        })
});

router.post('/signup', function (req, res, next) {
    console.log("Inside signup Post Request");
    var email = req.body.email;
    var password = bcrypt.hashSync(req.body.password, 10);
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    var traveler = new Traveler({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:password
    })
    traveler.save()
        .then(result => {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Successful added");
        })
        .catch(err=>{
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Something wrong with data"); 
        })
})


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

router.get("/:travelid",function (req, res, next) { //,passport.authenticate('jwt',{session:false})
    console.log("getting details of user having id: " + req.params.travelid)
    Traveler.findById(req.params.travelid).exec()
        .then(result => {
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


router.put("/:travelid", function (req, res, next) {
    console.log("changing user details")
    var email = req.body.email;
    var password = bcrypt.hashSync(req.body.password, 10);
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var school = req.body.school;
    var company = req.body.company;
    var address = req.body.address;
    var number = req.body.number;
    var aboutme = req.body.aboutme;
    var languages = req.body.languages;
    var gender = req.body.gender;

    Traveler.findByIdAndUpdate(req.params.travelid,{
        $set:{
            email:email
        }
    }).exec()
        .then(result => {
            console.log(result)
            Traveler.findByIdAndUpdate(req.params.travelid,{
                $set:{
                    firstname:firstname,
                    lastname:lastname,
                    school:school,
                    company:company,
                    address:address,
                    number:number,
                    aboutme:aboutme,
                    languages:languages,
                    gender:gender
                }
            }).exec()
                .then(result => {
                    res.cookie("loginemail", email, {
                        maxAge: 900000,
                        httpOnly: false,
                    })
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successfully updated")
                })
                .catch(err => {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("something wrong with data while entering other details")
                })
        })
        .catch(err => {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Email already in use entering other details")
        })
})

router.put("/editpassword/:travelid", function (req, res, next) {
    console.log("changing user details")
    var password = bcrypt.hashSync(req.body.password, 10);
    console.log(password)
    Traveler.findByIdAndUpdate(req.params.travelid,{
        $set:{
            password:password
        }
    }).exec()
        .then(result => {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Successfully updated")
        })
        .catch(err => {
            console.log(err)
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("something wrong with data while entering email and ")
        })
})


router.get("/:travel_id/bookingdetails", function (req, res, next) {
    console.log("Trying to fetch booking details")

    Booking.find({traveler : req.params.travel_id})
    .populate('property')
    .populate('owner')
    .populate('traveler')
    .exec()
        .then(result => {
            console.log(JSON.stringify(result))
            res.writeHead(200,{
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(result))
        })
        .catch(err => {
            console.log(err)
        })
    // Traveler.findById(req.params.travel_id)
    // .populate('bookings')
    // .exec()
    //     .then(result => {
    //         res.writeHead(200, {
    //             'Content-Type': 'application/json'
    //         })
    //         console.log(JSON.stringify(result.bookings))
    //         res.end(JSON.stringify(result.bookings))
    //     })
    //     .catch(err => {
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("Couldnt get booking details")
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
            Traveler.findByIdAndUpdate(req.params.travelid,{
                $set:{
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


router.post("/:travelid/question",function(req,res,next){
    console.log("Asking a question")
    var _id = req.body._id
    var topic = req.body.topic
    var question = req.body.question
    console.log("property is ",_id," topic is ",topic," question is ",question, " travler is ",req.params.travelid)
    Owner.findOne({
        properties : _id
    },{"_id":1}).exec()
        .then(result => {
            console.log(result._id)
            var questionDocument = new Question({
                travel: req.params.travelid,
                property : _id,
                owner : result._id,
                topic : topic,
                question : question
            })
            questionDocument.save()
                .then(result => {
                    console.log(result)
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify(result))
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end(err)
        })
})

router.get("/:travelid/question",function(req,res,next){
    console.log("getting questions")

    Question.find({
        travel : req.params.travelid
    })
    .populate('travel')
    .populate('property')
    .populate('owner')
    .exec()
        .then(result => {
            console.log(result)
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