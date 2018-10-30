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
            console.log("owner_id: ",result._id)
            req.session.user = result;
            res.cookie("ownerlogin",result._id.toString(), {
                maxAge: 900000,
                httpOnly: false,
                path: '/'
            })
            res.cookie("owneremail",result.email, {
                maxAge: 900000,
                httpOnly: false,
                path: '/',
                overwrite: true
            })
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end(JSON.stringify(result));
        })
        .catch( err => {
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
        email:email,
        password:password,
        firstname:firstname,
        lastname:lastname
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

    Owner.findByIdAndUpdate(req.params.ownerid,{$set:{
       password:password 
    }}).exec()
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

    // pool.getConnection(function (err, con) {
    //     if (err) {
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("Couldnt get a connection")
    //     } else {
    //         sql = "update owneruser set password='" + password + "' where owner_id='" + req.params.ownerid + "'";
    //         console.log(sql)
    //         con.query(sql, function (err, result) {
    //             if (err) {
    //                 res.writeHead(400, {
    //                     'Content-Type': 'text/plain'
    //                 })
    //                 res.end("something wrong with data while entering email and " + sql)
    //             } else {

    //                 res.writeHead(200, {
    //                     'Content-Type': 'text/plain'
    //                 })
    //                 res.end("Successfully updated")
    //             }
    //         })
    //     }
    // })
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

    try{
        Owner.findByIdAndUpdate(req.params.ownerid,{
            $set:{
                email:email
            }
        }).exec()
            .then(result => {
                Owner.findByIdAndUpdate(req.params.ownerid,{
                    $set:{
                        firstname:firstname,
                        lastname:lastname,
                        company:company,
                        billing_address:address,
                        city:city,
                        state:state,
                        zipcode:zipcode,
                        country:country,
                        number:number
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
    }catch(err){
        console.log(err)
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.end("something wrong with data while entering other details")
    }
    
    // pool.getConnection(function (err, con) {
    //     if (err) {
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("Couldnt get a connection")
    //     } else {
    //         sql = "update owneruser set email='" + email + "' where owner_id='" + req.params.ownerid + "'";
    //         console.log(sql)
    //         con.query(sql, function (err, result) {
    //             if (err) {
    //                 res.writeHead(400, {
    //                     'Content-Type': 'text/plain'
    //                 })
    //                 res.end("something wrong with data while entering email and " + sql)
    //             } else {
    //                 sql = "update owneruserinfo set firstname='" + firstname + "',lastname='" + lastname + "',company='" + company + "',billing_address='" + address + "',city='" + city + "',state='" + state + "',zipcode='" + zipcode + "',country='" + country + "',number='" + number + "' where owner_id=" + req.params.ownerid;
    //                 console.log(sql)
    //                 con.query(sql, function (err, result) {
    //                     if (err) {
                            // res.writeHead(400, {
                            //     'Content-Type': 'text/plain'
                            // })
                            // res.end("something wrong with data while entering other details")
    //                     } else {

                            // res.cookie("owneremail", email, {
                            //     maxAge: 900000,
                            //     httpOnly: false,
                            // })
                            // res.writeHead(200, {
                            //     'Content-Type': 'text/plain'
                            // })
                            // res.end("Successfully updated")
    //                     }
    //                 })
    //             }
    //         })
    //     }
    // })
})

router.get("/:owner_id/property/", async (req, res, next) => {
    console.log("Trying to get properties listed by owner id: ", req.params.owner_id)
    Owner.find()
        .populate({path:'properties',match:{
            location_city:"surat"
        }})
        .exec()
            .then(result => {
                //console.log(result)
                // res.writeHead(200,{
                //     'Content-Type':'application/json'
                // })
                console.log(JSON.stringify(result))
                // res.end(JSON.stringify(result.properties))
            })
            .catch(err => {
                console.log(err)
            })
    // try{
    //     var result = await Owner.findById(req.params.owner_id,{'properties':1,'_id':0}).exec()
    //     propertyList = []
    //     await function() {
    //         for(property of result.properties){
    //             Property.findById(property).exec()
    //                 .then(info => {
    //                     console.log(info)
    //                     propertyList.push(info)
    //                 })
    //         }
    //     }
    //     console.log(propertyList)
    // }catch(err){
    //     console.log(err)
    // }
    // let propertiesList =  ""
    // Owner.findById(req.params.owner_id,{'properties':1,'_id':0}).exec()
    //     .then(result => {
    //         result.properties.forEach(property => {
    //             Property.findById(property).exec()
    //                 .then(result => {
    //                     console.log(JSON.stringify(result))
    //                     propertiesList = propertiesList + JSON.stringify(result)
    //                 })
    //                 .catch(err => {
    //                     console.log("Error while fetching properties")
    //                 })
    //         });
    //         console.log("properties: "+propertiesList)
    //     })
    //     .catch(err => {
    //         console.log("err in owner properties ",err)
    //     }) 
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("Couldnt get connection")
    //     } else {
    //         sql = "select p.*,pi.* from place as p, place_info as pi where p.owner_id='" + req.params.owner_id + "' and p._id=pi._id";
    //         console.log(sql)
    //         con.query(sql, function (err, result) {
    //             if (err) {
    //                 res.writeHead(400, {
    //                     'Content-Type': 'text/plain'
    //                 })
    //                 res.end("Couldnt get details")
    //             } else {
    //                 res.writeHead(200, {
    //                     'Content-Type': 'text/plain'
    //                 })
    //                 console.log(JSON.stringify(result))
    //                 res.end(JSON.stringify(result))
    //             }
    //         })
    //     }
    // })
})


router.get("/:owner_id/dashboard", function (req, res, next) {
    console.log("Trying to fetch booking details")
    Booking.find({owner:req.params.owner_id})
    .populate('property')
    .populate('traveler')
    .populate('owner')
    .exec()
        .then(result => {
            console.log(JSON.stringify(result)) 
            res.writeHead(200,{
                'Content-Type':'application/json'
            })
            res.end(JSON.stringify(result))
        })
        .catch(err => {
            console.log(err)
            res.writeHead(400,{
                'Content-Type':'text/plain'
            })
            res.end(err)
        })
    // Owner.findById(req.params.owner_id)
    //     .populate('bookings')
    //     .exec()
    //         .then(result => {
    //             console.log(result.bookings)
    //             res.writeHead(200, {
    //                 'Content-Type': 'application/json'
    //             })
    //             res.end(JSON.stringify(result.bookings))
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // pool.getConnection(function (err, con) {
    //     if (err) {
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("Couldnt get connection")
    //     } else {
    //         sql = "select p.*,pi.*,ti.*,new.* from place as p, place_info as pi, traveluserinfo as ti,(select * from booking where owner_id='" + req.params.owner_id + "') as new where p._id in (new._id) and p._id = pi._id and ti.travel_id in( new.travel_id)"
    //         //sql = "select p.*,pi.* from place as p,place_info as pi where p.owner_id='"+req.params.owner_id+"' and p._id = pi._id"
    //         console.log(sql);
    //         con.query(sql, function (err, result) {
    //             if (err) {
    //                 res.writeHead(400, {
    //                     'Content-Type': 'text/plain'
    //                 })
    //                 res.end("Couldnt get connection")
    //             } else {
    //                 res.writeHead(200, {
    //                     'Content-Type': 'application/json'
    //                 })
    //                 console.log(JSON.stringify(result))
    //                 res.end(JSON.stringify(result))
    //             }
    //         })
    //     }
    // })
})


router.post("/:ownerid/question",function(req,res,next){
    console.log("Asking a question")
    var _id = req.body._id
    var answer = req.body.answer
    console.log(_id," ",answer)
    
    Question.findByIdAndUpdate(_id,{
        $set : { 
            answer: answer 
        }
    }).exec()
        .then(result => {
            console.log(result)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(result))
        })
        .catch(err => {

        })
})

router.get("/:ownerid/question",function(req,res,next){
    console.log("getting questions")

    Question.find({
        owner:req.params.ownerid
    })
    .populate('traveler')
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
