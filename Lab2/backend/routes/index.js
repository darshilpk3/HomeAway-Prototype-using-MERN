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


router.post('/travellogin', function (req, res, next) {
    console.log("Inside Login Post Request");
    var email = req.body.email;
    var password = (req.body.password);
    console.log(email, password)
    Traveler.findOne({ email: email })
        .exec()
        .then(result => {
            if (!result) {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end("Invalid Credentials");
            } else {
                console.log(result.password, " ", password)
                console.log(bcrypt.compareSync(password, result.password))
                if (bcrypt.compareSync(password, result.password)) {
                    console.log("password matched")
                    var token = jwt.sign(result.toJSON(), 'secretToken', {
                        expiresIn: 60 * 60 * 24
                    });
                    req.session.user = result;
                    const jsonResponse = {
                        "_id": result._id.toString(),
                        "email": result.email,
                        "token": token,
                    }
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    res.end(JSON.stringify(jsonResponse));
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }
            }

        })
        .catch(err => {
            console.log(err)
        })
})


router.post('/travelsignup', function (req, res, next) {
    console.log("Inside signup Post Request");
    var email = req.body.email;
    var password = bcrypt.hashSync(req.body.password, 10);
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    var traveler = new Traveler({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    })
    traveler.save()
        .then(result => {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end(JSON.stringify(result));
        })
        .catch(err => {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Email-Id already exist");
        })
})

router.post('/ownerlogin', function (req, res, next) {

    console.log("Inside Login Post Request");
    var email = req.body.email;
    var password = req.body.password;
    console.log(email, password)
    Owner.findOne({ email: email }).exec()
        .then(result => {
            if (!result) {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end("Invalid Credentials");
            } else {
                console.log("checking: ",bcrypt.compareSync(password, result.password))
                if (bcrypt.compareSync(password, result.password)) {
                    console.log("password matched")
                    var token = jwt.sign(result.toJSON(), 'secretToken', {
                        expiresIn: 60 * 60 * 24
                    });
                    req.session.user = result;
                    const jsonResponse = {
                        "_id": result._id.toString(),
                        "email": result.email,
                        "token": token
                    }
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end(JSON.stringify(jsonResponse));
                } else {
                    console.log("Password didnt match")
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }
            }
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
            res.end("Email-Id already exist");
        })
})

module.exports = router;
