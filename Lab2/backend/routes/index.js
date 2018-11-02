var express = require('express');
var router = express.Router();
var pool = require('../pool');
var mysql = require('mysql');
var md5 = require('md5');
var path = require('path')
var multer = require('multer')
var Traveler = require('../models/traveler')
var Owner = require('../models/owner')
var cookieParser = require('cookie-parser')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var kafka = require('../kafka/client')

router.use(cookieParser())


router.post('/travellogin',function(req,res,next){
    console.log("Inside Login Post Request");
    var email = req.body.email;
    var password = (req.body.password);
    console.log(email, password)
    Traveler.findOne({ email: email })
        .exec()
        .then(result => {
            console.log(result.password," ",password)
            console.log(bcrypt.compareSync(password, result.password))
            if (bcrypt.compareSync(password, result.password)) {
                console.log("password matched")
                var token = jwt.sign(result.toJSON(), 'secretToken', {
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
                const jsonResponse = {
                    "_id" : result._id,
                    "email" : result.email,
                    "token" : token,
                }
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                res.end(JSON.stringify(jsonResponse));
            }else{
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end("Invalid Credentials");
            }
        })
        .catch( err => {
            console.log(err)
        })
})

// router.post('/travellogin',function(req,res,next){
//     kafka.make_request('post_login',req.body, function(err,results){
//         if(err){
//             console.log(err)
//             res.writeHead(400,{
//                 'Content-Type':'text/plain'
//             })
//             res.end(err)
//         }else{
//             res.writeHead(200,{
//                 'Content-Type':'application/json'
//             })
//             res.end(JSON.stringify(results))
//         }
//     })
// })
router.post('/travelsignup',function(req,res,next){
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

router.post('/ownerlogin', function (req, res, next) {

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


router.post('/ownersignup', function (req, res, next) {
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

module.exports = router;
