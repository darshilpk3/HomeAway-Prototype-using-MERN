var express = require('express');
var router = express.Router();
var path = require('path')
var Property = require('../models/property')
var Booking = require('../models/booking')
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
      res.end(JSON.stringify(result))
    }
  })
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

module.exports = router
