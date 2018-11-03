var express = require('express');
var router = express.Router();
var pool = require('../pool');
var mysql = require('mysql');
var md5 = require('md5');
var path = require('path')
var multer = require('multer')
var cookieParser = require('cookie-parser')
var Traveler = require('../models/traveler')
var Owner = require('../models/owner')
var Property = require('../models/property')
var Booking = require('../models/booking')
var moment = require('moment')
var twix = require('twix')
var kafka = require('../kafka/client')

router.post("/search", function (req, res, next) {
  console.log("inside post search")
  var range = Array(Math.floor((new Date(req.body.available_to) - new Date(req.body.available_from)) / 86400000) + 1).fill().map((_, idx) => (new Date(new Date(req.body.available_from).getTime() + idx * 86400000)))
  const requestData = {
    "place" : req.body.place,
    "available_from" : req.body.available_from,
    "available_to" : req.body.available_to,
    "accomodates" : req.body.accomodates,
    "range" : range
  }
  console.log(range)

  kafka.make_request("searchProperties",requestData,function(err,result){
    if(err){
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("No Properties")
    }else if(result.message){
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("No Properties")
    }else{
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(result))
    }
  })

  // Property.find({
  //   available_from: { $lte: available_from },
  //   available_to: { $gte: available_to },
  //   accomodates: { $gte: accomodates },
  //   location_city: { $regex: new RegExp('^' + place, 'i') },
  //   dates: { $in: range }
  // })
  //   .then(result => {
  //     //console.log(result)
  //     res.writeHead(200, {
  //       'Content-Type': 'application/json'
  //     })
  //     res.end(JSON.stringify(result))
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     res.writeHead(400, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end("No Properties")
  //   })
})

router.post("/", function (req, res, next) {
  console.log("Trying to add a new property for ownerid: ", req.body.owner_id)
  let range = Array(Math.floor((new Date(req.body.available_to) - new Date(req.body.available_from)) / 86400000) + 1).fill().map((_, idx) => (new Date(new Date(req.body.available_from).getTime() + idx * 86400000)))
  const requestData = {
    "owner_id" : req.body.owner_id,
    "place_name" : req.body.place_name,
    "street" : req.body.street,
    "apt" : req.body.apt,
    "state" : req.body.state,
    "zipcode" : req.body.zipcode,
    "country" : req.body.country,
    "location_city" : req.body.location_city,
    "available_from" : req.body.available_from,
    "available_to" : req.body.available_to,
    "bedrooms" : req.body.bedrooms,
    "bathrooms" : req.body.bathrooms,
    "accomodates" : req.body.accomodates,
    "headline" : req.body.headline,
    "description" : req.body.description,
    "price" : req.body.price,
    "range" : range
  }

  kafka.make_request("addProperty",requestData,function(err,result){
    if(err){
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Couldnt add property")
    }else if(result.message){
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Couldnt add property")
    }else{
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(result._id))
    }
  })
  // var property = new Property({
  //   place_name: place_name,
  //   headline: headline,
  //   description: description,
  //   street: street,
  //   apt: apt,
  //   location_city: location_city,
  //   state: state,
  //   zipcode: zipcode,
  //   country: country,
  //   available_from: available_from,
  //   available_to: available_to,
  //   bedrooms: bedrooms,
  //   bathrooms: bathrooms,
  //   accomodates: accomodates,
  //   price: price,
  //   dates: range
  // })

  // property.save()
  //   .then(result => {
  //     Owner.findByIdAndUpdate(owner_id, { $push: { properties: result._id } }).exec()
  //       .then(result2 => {
  //         //console.log(result2)
  //         res.writeHead(200, {
  //           'Content-Type': 'text/plain'
  //         })
  //         res.end(JSON.stringify(result._id))
  //       })
  //   })
  //   .catch(err => {
  //     console.log("Error while inserting into owner: ", err)
  //   })
})


router.put("/:property_id", function (req, res, next) {
  console.log("Trying to update an existing property")
  let range = Array(Math.floor((new Date(req.body.available_to) - new Date(req.body.available_from)) / 86400000) + 1).fill().map((_, idx) => (new Date(new Date(req.body.available_from).getTime() + idx * 86400000)))
  const requestData = {
    "property_id" : req.params.property_id,
    "place_name" : req.body.place_name,
    "location_city" : req.body.location_city,
    "street" : req.body.street,
    "apt" : req.body.apt,
    "state" : req.body.state,
    "zipcode" : req.body.zipcode,
    "country" : req.body.country,
    "bedrooms" : req.body.bedrooms,
    "bathrooms" : req.body.bathrooms,
    "accomodates" : req.body.accomodates,
    "headline" : req.body.headline,
    "description" : req.body.description,
    "price" : req.body.price,
    "available_from" : req.body.available_from,
    "available_to" : req.body.available_to,
    "range" : range
  }

  kafka.make_request("editPropertyDetails",requestData,function(err,result){
    if(err){
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      console.log(err)
      res.end("Couldnt add details into placeinfo table")
    }else if(result.message){
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      console.log(err)
      res.end("Couldnt add details into placeinfo table")
    }else{
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end("Sucessfully updated the property")
    }
  })
  
  // Property.findByIdAndUpdate(property_id, {
  //   $set: {
  //     place_name: place_name,
  //     location_city: location_city,
  //     street: street,
  //     apt: apt,
  //     state: state,
  //     zipcode: zipcode,
  //     country: country,
  //     bedrooms: bedrooms,
  //     bathrooms: bathrooms,
  //     accomodates: accomodates,
  //     headline: headline,
  //     description: description,
  //     price: price,
  //     available_from: available_from,
  //     available_to: available_to,
  //     dates: range
  //   }
  // }).exec()
  //   .then(result => {
  //     res.writeHead(200, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end("Sucessfully updated the property")
  //   })
  //   .catch(err => {
  //     res.writeHead(400, {
  //       'Content-Type': 'text/plain'
  //     })
  //     console.log(err)
  //     res.end("Couldnt add details into placeinfo table")
  //   })
})


router.get("/:propertyid", function (req, res, next) {
  console.log("Trying to get details of property having id: ", req.params.propertyid)

  kafka.make_request("getPropertyDetails",req.params,function(err,result){
    if(err){
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Couldnt query from place")
    }else if(result.message){
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Couldnt query from place")
    }else{
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      //console.log(JSON.stringify(result))
      res.end(JSON.stringify(result))
    }
  })
  
  // Property.findById(req.params.propertyid).exec()
  //   .then(result => {
  //     res.writeHead(200, {
  //       'Content-Type': 'application/json'
  //     })
  //     //console.log(JSON.stringify(result))
  //     res.end(JSON.stringify(result))
  //   })
  //   .catch(err => {
  //     res.writeHead(400, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end("Couldnt query from place")
  //   })
})


router.post("/:propertyid/book", function (req, res, next) {
  console.log("Trying to book property with id: ", req.params.propertyid)
  let range = Array(Math.floor((new Date(req.body.booking_to) - new Date(req.body.booking_from)) / 86400000) + 1).fill().map((_, idx) => (new Date(new Date(req.body.booking_from).getTime() + idx * 86400000)))
   const requestData = {
    "_id" : req.body._id,
    "travel_id" : req.body.travel_id,
    "booking_from" : req.body.booking_from,
    "booking_to" : req.body.booking_to,
    "guests" : req.body.guests,
    "range":range,
    "propertyid" : req.params.propertyid
   }
  
  kafka.make_request("bookProperty",requestData,function(err,result){
    if(err){
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Couldnt book")
    }else if(result.message){
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Couldnt book")
    }else{
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end("Booked")
    }
  })
  // Owner.findOne({
  //   properties: _id
  // }, { "_id": 1 }).exec()
  //   .then(owner => {
  //     console.log(owner)
  //     var booking = new Booking({
  //       booking_from: booking_from,
  //       booking_to: booking_to,
  //       guests: guests,
  //       property: _id,
  //       traveler: travel_id,
  //       owner: owner
  //     })
  //     booking.save()
  //       .then(result => {
  //         Property.findByIdAndUpdate(_id, {
  //           $push: {
  //             bookings: result._id
  //           }
  //         }).exec()
  //         Traveler.findByIdAndUpdate(travel_id, {
  //           $push: {
  //             bookings: result._id
  //           }
  //         }).exec()
  //         Owner.findByIdAndUpdate(owner, {
  //           $push: {
  //             bookings: result._id,
  //             booking_from: booking_from,
  //             booking_to: booking_to
  //           },
  //         }).exec()
  //         Property.findByIdAndUpdate(_id, {
  //           $pull: { dates: { $in: range } }
  //         }).exec()
  //         res.writeHead(200, {
  //           'Content-Type': 'text/plain'
  //         })
  //         res.end("Booked")
  //       })
  //   })
  //   .catch(err => {
  //     res.writeHead(400, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end("Couldnt book")
  //     console.log(err)
  //   })
})

router.post("/:property_id/upload", function (req, res, next) {
  var property_id = req.params.property_id
  let imageFile = req.files.file
  console.log(imageFile.name);
  imageFile.mv(`./public/uploads/property-${property_id}-${imageFile.name}`, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    } else {
      Property.findByIdAndUpdate(property_id, {
        $push: {
          property_images: `/public/uploads/property-${property_id}-${imageFile.name}`
        }
      }).exec()
        .then(result => {
          console.log("should be pushed")
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          });
          //  console.log(JSON.stringify(result.property_images))
          res.end(JSON.stringify(result.property_images))
        })
        .catch(err => {
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          });
          res.send(err)
        })
    }
  })
})


router.delete("/:property_id/upload", function (req, res, next) {
  var property_id = req.params.property_id
  Property.findByIdAndUpdate(property_id, {
    $set: {
      property_images: []
    }
  }).exec()
    .then(result => {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      //console.log(JSON.stringify(result.property_images))
      res.end(JSON.stringify(result))
    })
    .catch(err => {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.send(err)
    })
})


router.post("/filter", function (req, res, next) {
  console.log("Filtered result for ")
  console.log("price: ",req.body.price)
  console.log("bedrooms: ",req.body.bedrooms)
  var place = req.body.place
  var available_from = req.body.available_from
  var available_to = req.body.available_to
  var accomodates = req.body.accomodates
  var range = Array(Math.floor((new Date(available_to) - new Date(available_from)) / 86400000) + 1).fill().map((_, idx) => (new Date(new Date(available_from).getTime() + idx * 86400000)))

  if(req.body.price & !req.body.bedrooms){
    console.log("price filter should be there")
    Property.find({
      available_from: { $lte: available_from },
      available_to: { $gte: available_to },
      accomodates: { $gte: accomodates },
      location_city: { $regex: new RegExp('^' + place, 'i') },
      price: { $lte: req.body.price },
      dates: { $in: range }
    })
      .then(result => {
        console.log(result.length)
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
      })
  }else if(req.body.bedrooms && !req.body.price){
    Property.find({
      available_from: { $lte: available_from },
      available_to: { $gte: available_to },
      accomodates: { $gte: accomodates },
      location_city: { $regex: new RegExp('^' + place, 'i') },
      bedrooms: { $gte: req.body.bedrooms },
      dates: { $in: range }
    })
      .then(result => {
        console.log(result.length)
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
      })
  }else if(req.body.price && req.body.bedrooms){
    Property.find({
      available_from: { $lte: available_from },
      available_to: { $gte: available_to },
      accomodates: { $gte: accomodates },
      location_city: { $regex: new RegExp('^' + place, 'i') },
      price: { $lte: req.body.price },
      bedrooms:{$gte:req.body.bedrooms},
      dates: { $in: range }
    })
      .then(result => {
        console.log(result.length)
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
      })
  }else{
    Property.find({
      available_from: { $lte: available_from },
      available_to: { $gte: available_to },
      accomodates: { $gte: accomodates },
      location_city: { $regex: new RegExp('^' + place, 'i') },
      dates: { $in: range }
    })
      .then(result => {
        console.log(result.length)
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
      })
  }
  
})

router.post("/filterbedrooms", function (req, res, next) {
  console.log("Filtered result")
  var place = req.body.place
  var available_from = req.body.available_from
  var available_to = req.body.available_to
  var accomodates = req.body.accomodates
  var bedrooms = req.body.bedrooms
  var range = Array(Math.floor((new Date(available_to) - new Date(available_from)) / 86400000) + 1).fill().map((_, idx) => (new Date(new Date(available_from).getTime() + idx * 86400000)))

  Property.find({
    available_from: { $lte: available_from },
    available_to: { $gte: available_to },
    accomodates: { $gte: accomodates },
    location_city: { $regex: new RegExp('^' + place, 'i') },
    bedrooms: { $gte: bedrooms },
    dates: { $in: range }
  })
    .then(result => {
      //console.log(result)
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
    })
    .catch(err => {
      console.log(err)
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
    })
})
module.exports = router
