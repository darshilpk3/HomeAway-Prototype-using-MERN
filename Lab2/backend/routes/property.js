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
  // var itr = moment.twix(new Date(available_from),new Date(available_to)).iterate("days");
  // var range=[];
  // while(itr.hasNext()){
  //     range.push(itr.next().toDate())
  // }
  var range = []
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
      console.log(result)
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
      //     res.end("Couldnt find properties")
    })
    //   .then(result => {
    //     console.log(result.length)
    // //     Booking.find({
    // //       property : result//{$in : result},
    // //       // booking_from : { $gt: available_from , $lt: available_to},
    // //       // booking_to : {$gt: available_from, $lt: available_to}
    // //     }).exec()
    // //       .then(result2 => {
    // //         console.log(result2)
    // //       })
    // res.writeHead(200,{
    //   'Content-Type':'application/json'
    // })
    // res.end(JSON.stringify(result))
    //       })
    .catch(err => {
      console.log(err)
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      //     res.end("Couldnt find properties")
    })
  // pool.getConnection(function (err, con) {
  //   if (err) {
  //     res.writeHead(400, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end("Couldnt get a connection")
  //   } else {
  //     //sql = "select _id from booking where _id in (select _id from place where (location_city='"+place+"') and ('"+available_from+"' between available_from and available_to) and ('"+available_to+"' between available_from and available_to) and (accomodates>='"+accomodates+"')) and ('"+available_from+"' not between booking_from and booking_to) and ('"+available_to+"' not between booking_from and booking_to)"
  //     sql = "select p.*,pi.* from place as p,place_info as pi where (p.location_city='" + place + "') and ('" + available_from + "' between p.available_from and p.available_to) and ('" + available_to + "' between p.available_from and p.available_to) and (p.accomodates>='" + accomodates + "') and p._id not in (select _id from booking where ('" + available_from + "' between booking_from and booking_to) or ('" + available_to + "' between booking_from and booking_to)) and p._id=pi._id"
  //     console.log(sql);
  //     con.query(sql, function (err, result) {
  //       if (err) {
  //         res.writeHead(400, {
  //           'Content-Type': 'text/plain'
  //         })
  //         res.end("Details not proper")
  //       } else if (result.length === 0) {
  //         res.writeHead(200, {
  //           'Content-Type': 'text/plain'
  //         })
  //         console.log("No places available")
  //         res.end("No places available")
  //       } else {
  // res.writeHead(200, {
  //   'Content-Type': 'application/json'
  // })
  // res.end(JSON.stringify(result))
  //       }
  //     })
  //   }
  // })
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
  // var itr = moment.twix(new Date(available_from),new Date(available_to)).iterate("days");
  // var range=[];
  // while(itr.hasNext()){
  //     range.push(itr.next().toDate())
  // }
  var range = []
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
      console.log(result._id)
      Owner.findByIdAndUpdate(owner_id, { $push: { properties: result._id } }).exec()
        .then(result2 => {
          console.log(result2)
          booking = new Booking({
            property: result._id
          })
          booking.save()
            .then(result => {
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
    .catch(err => {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Couldnt add details into placeinfo table")
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
      price: price
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
      console.log(JSON.stringify(result))
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
  // var itr = moment.twix(new Date(booking_from),new Date(booking_to)).iterate("days");
  // var range=[];
  // while(itr.hasNext()){
  //     range.push(itr.next().toDate())
  // }
  var range = []
  var range = Array(Math.floor((new Date(booking_to) - new Date(booking_from)) / 86400000) + 1).fill().map((_, idx) => (new Date(new Date(booking_from).getTime() + idx * 86400000)))
  console.log("Booking range")
  console.log(range)
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
  // pool.getConnection(function (err, con) {
  //   if (err) {
  //     res.writeHead(400, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end("Couldnt get connection")
  //   } else {
  //     sql = "select owner_id from place where _id='" + _id + "'";
  //     console.log(sql)
  //     con.query(sql, function (err, result) {
  //       if (err) {
  //         res.writeHead(400, {
  //           'Content-Type': 'text/plain'
  //         })
  //         res.end("Couldnt get owner_id")
  //       } else {
  //         const owner_id = result[0].owner_id
  //         sql = "insert into booking(travel_id,owner_id,_id,booking_from,booking_to,guests) values('" + travel_id + "','" + owner_id + "','" + _id + "','" + booking_from + "','" + booking_to + "','" + guests + "')"
  //         console.log(sql);
  //         con.query(sql, function (err, result) {
  //           if (err) {
  // res.writeHead(400, {
  //   'Content-Type': 'text/plain'
  // })
  // console
  // res.end("Couldnt add details")
  //           } else {
  // res.writeHead(200, {
  //   'Content-Type': 'text/plain'
  // })
  // res.end("Booked")
  //           }
  //         })
  //       }
  //     })
  //   }
  // })
})


// router.post("/upload", function (req, res, next) {
//   console.log("Trying to upload multiple images")
//   var imagePaths = "";
//   for (let i = 0; i <= req.body.totalImages; i++) {

//     console.log(req.files["image" + i])
//     imageFile = req.files["image" + i]
//     imageFile.mv(`./public/uploads/property-${i}${path.extname(imageFile.name)}`, function (err) {
//       if (err) {
//         console.log(err)
//         return res.status(500).send(err);
//       } else {
//         imagePaths = imagePaths + "./public/uploads/property-" + i + "" + path.extname(imageFile.name) + ","
//         console.log(imagePaths.split(","))
//       }
//     })
//   }
//   res.send(200)
// })


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
          console.log(JSON.stringify(result.property_images))
          res.end(JSON.stringify(result.property_images))
        })
        .catch(err => {
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          });
          res.send(err)
        })
      // pool.getConnection(function (err, con) {
      //   if (err) {
      //     res.writeHead(400, {
      //       'Content-Type': 'text/plain'
      //     });
      //     res.end("Couldnt get connection")
      //   } else {
      //     sql = `select property_images from place_info where _id='${property_id}'`
      //     con.query(sql, function (err, result) {
      //       if (err) {
      //         res.writeHead(400, {
      //           'Content-Type': 'text/plain'
      //         });
      //         res.end("Couldnt get connection")
      //       } else {
      //         var property_images = result[0].property_images;
      //         property_images = property_images + "," + `/public/uploads/property-${property_id}-${imageFile.name}`;
      //         sql = `update place_info set property_images=concat(ifnull(property_images,""),'${property_images}') where _id='${property_id}'`;
      //         console.log(sql);
      //         con.query(sql, function (err, result) {
      //           if (err) {
      //             res.writeHead(400, {
      //               'Content-Type': 'text/plain'
      //             });
      //           } else {
      //             res.writeHead(200, {
      //               'Content-Type': 'text/plain'
      //             });
      //             console.log(property_images)
      //             res.end(property_images)
      //           }
      //         })
      //       }
      //     })

      //   }
      // })
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
      console.log(JSON.stringify(result.property_images))
      res.end(JSON.stringify(result))
    })
    .catch(err => {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.send(err)
    })
  // let imageFile = req.files.file
  // console.log(imageFile.name);
  // imageFile.mv(`./public/uploads/property-${property_id}-${imageFile.name}`, function (err) {
  //   if (err) {
  //     console.log(err)
  //     return res.status(500).send(err);
  //   } else {
  //     Property.findByIdAndUpdate(property_id,{
  //       $push:{
  //         property_images:`/public/uploads/property-${property_id}-${imageFile.name}`
  //       }
  //     }).exec()
  //       .then(result => {
  //         console.log("should be pushed")
  // res.writeHead(200, {
  //   'Content-Type': 'text/plain'
  // });
  // console.log(JSON.stringify(result.property_images))
  // res.end(JSON.stringify(result.property_images))
  //       })
  //       .catch(err => {
  //         res.writeHead(400, {
  //           'Content-Type': 'text/plain'
  //         });
  //         res.send(err)
  //       })
  //   }
  // })
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
  console.log(range)
  Property.find({
    available_from: { $lte: available_from },
    available_to: { $gte: available_to },
    accomodates: { $gte: accomodates },
    location_city: { $regex: new RegExp('^' + place, 'i') },
    price : { $lte : price},
    bedrooms: { $eq: bedrooms},
    dates: { $in: range }
  })
    .then(result => {
      console.log(result)
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
