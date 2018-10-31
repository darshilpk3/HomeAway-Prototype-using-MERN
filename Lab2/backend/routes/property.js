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


router.post("/search", function (req, res, next) {
  console.log("inside post search")
  var place = req.body.place
  var available_from = req.body.available_from
  var available_to = req.body.available_to
  var accomodates = req.body.accomodates
  var range = Array(Math.floor((new Date(available_to) - new Date(available_from)) / 86400000) + 1).fill().map((_, idx) => (new Date(new Date(available_from).getTime() + idx * 86400000)))
  console.log(range)
  Property.find({
    available_from: { $lte: available_from },
    available_to: { $gte: available_to },
    accomodates: { $gte: accomodates },
    location_city: { $regex: new RegExp('^' + place, 'i') },
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

router.post("/", function (req, res, next) {
  console.log("Trying to add a new property for ownerid: ", req.body.owner_id)
  var owner_id = req.body.owner_id
  var place_name = req.body.place_name
  var street = req.body.street
  var apt = req.body.apt
  var state = req.body.state
  var zipcode = req.body.zipcode
  var country = req.body.country
  var location_city = req.body.location_city
  var available_from = req.body.available_from
  var available_to = req.body.available_to
  var bedrooms = req.body.bedrooms
  var bathrooms = req.body.bathrooms
  var accomodates = req.body.accomodates
  var headline = req.body.headline
  var description = req.body.description
  var price = req.body.price
  var range = Array(Math.floor((new Date(available_to) - new Date(available_from)) / 86400000) + 1).fill().map((_, idx) => (new Date(new Date(available_from).getTime() + idx * 86400000)))
  var property = new Property({
    place_name: place_name,
    headline: headline,
    description: description,
    street: street,
    apt: apt,
    location_city: location_city,
    state: state,
    zipcode: zipcode,
    country: country,
    available_from: available_from,
    available_to: available_to,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    accomodates: accomodates,
    price: price,
    dates: range
  })

  property.save()
    .then(result => {
      Owner.findByIdAndUpdate(owner_id, { $push: { properties: result._id } }).exec()
        .then(result => {
          //console.log(result2)
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end("Sucessfully added the property")
        })
    })
    .catch(err => {
      console.log("Error while inserting into owner: ", err)
    })
})


router.put("/:property_id", function (req, res, next) {
  console.log("Trying to update an existing property")
  var property_id = req.params.property_id
  var owner_id = req.body.owner_id
  var place_name = req.body.place_name
  var location_city = req.body.location_city
  var street = req.body.street
  var apt = req.body.apt
  var state = req.body.state
  var zipcode = req.body.zipcode
  var country = req.body.country
  var bedrooms = req.body.bedrooms
  var bathrooms = req.body.bathrooms
  var accomodates = req.body.accomodates
  var headline = req.body.headline
  var description = req.body.description
  var price = req.body.price
  var available_from = req.body.available_from
  var available_to = req.body.available_to
  var range = Array(Math.floor((new Date(available_to) - new Date(available_from)) / 86400000) + 1).fill().map((_, idx) => (new Date(new Date(available_from).getTime() + idx * 86400000)))

  Property.findByIdAndUpdate(property_id, {
    $set: {
      place_name: place_name,
      location_city: location_city,
      street: street,
      apt: apt,
      state: state,
      zipcode: zipcode,
      country: country,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      accomodates: accomodates,
      headline: headline,
      description: description,
      price: price,
      available_from: available_from,
      available_to: available_to,
      dates: range
    }
  }).exec()
    .then(result => {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end("Sucessfully updated the property")
    })
    .catch(err => {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      console.log(err)
      res.end("Couldnt add details into placeinfo table")
    })
})


router.get("/:propertyid", function (req, res, next) {
  console.log("Trying to get details of property having id: ", req.params.propertyid)
  Property.findById(req.params.propertyid).exec()
    .then(result => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      //console.log(JSON.stringify(result))
      res.end(JSON.stringify(result))
    })
    .catch(err => {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Couldnt query from place")
    })
})


router.post("/:propertyid/book", function (req, res, next) {
  console.log("Trying to book property with id: ", req.params.propertyid)
  const _id = req.body._id
  const travel_id = req.body.travel_id
  const booking_from = req.body.booking_from
  const booking_to = req.body.booking_to
  const guests = req.body.guests
  var range = Array(Math.floor((new Date(booking_to) - new Date(booking_from)) / 86400000) + 1).fill().map((_, idx) => (new Date(new Date(booking_from).getTime() + idx * 86400000)))

  Owner.findOne({
    properties: _id
  }, { "_id": 1 }).exec()
    .then(owner => {
      console.log(owner)
      var booking = new Booking({
        booking_from: booking_from,
        booking_to: booking_to,
        guests: guests,
        property: _id,
        traveler: travel_id,
        owner: owner
      })
      booking.save()
        .then(result => {
          Property.findByIdAndUpdate(_id, {
            $push: {
              bookings: result._id
            }
          }).exec()
          Traveler.findByIdAndUpdate(travel_id, {
            $push: {
              bookings: result._id
            }
          }).exec()
          Owner.findByIdAndUpdate(owner, {
            $push: {
              bookings: result._id,
              booking_from: booking_from,
              booking_to: booking_to
            },
          }).exec()
          Property.findByIdAndUpdate(_id, {
            $pull: { dates: { $in: range } }
          }).exec()
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end("Booked")
        })
    })
    .catch(err => {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Couldnt book")
      console.log(err)
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
  console.log("Filtered result")
  var place = req.body.place
  var available_from = req.body.available_from
  var available_to = req.body.available_to
  var accomodates = req.body.accomodates
  var price = req.body.price
  var bedrooms = req.body.bedrooms
  var range = []
  var range = Array(Math.floor((new Date(available_to) - new Date(available_from)) / 86400000) + 1).fill().map((_, idx) => (new Date(new Date(available_from).getTime() + idx * 86400000)))

  Property.find({
    available_from: { $lte: available_from },
    available_to: { $gte: available_to },
    accomodates: { $gte: accomodates },
    location_city: { $regex: new RegExp('^' + place, 'i') },
    price: { $lte: price },
    bedrooms: { $eq: bedrooms },
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
