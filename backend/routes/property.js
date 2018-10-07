var express = require('express');
var router = express.Router();
var pool = require('../pool');
var mysql = require('mysql');
var md5 = require('md5');
var path = require('path')
var multer = require('multer')
var cookieParser = require('cookie-parser')


router.post("/search", function (req, res, next) {
    console.log("inside post search")
    var place = req.body.place
    var available_from = req.body.available_from
    var available_to = req.body.available_to
    var accomodates = req.body.accomodates
  
    pool.getConnection(function (err, con) {
      if (err) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end("Couldnt get a connection")
      } else {
        //sql = "select place_id from booking where place_id in (select place_id from place where (location_city='"+place+"') and ('"+available_from+"' between available_from and available_to) and ('"+available_to+"' between available_from and available_to) and (accomodates>='"+accomodates+"')) and ('"+available_from+"' not between booking_from and booking_to) and ('"+available_to+"' not between booking_from and booking_to)"
        sql = "select p.*,pi.* from place as p,place_info as pi where (p.location_city='" + place + "') and ('" + available_from + "' between p.available_from and p.available_to) and ('" + available_to + "' between p.available_from and p.available_to) and (p.accomodates>='" + accomodates + "') and p.place_id not in (select place_id from booking where ('" + available_from + "' between booking_from and booking_to) or ('" + available_to + "' between booking_from and booking_to)) and p.place_id=pi.place_id"
        console.log(sql);
        con.query(sql, function (err, result) {
          if (err) {
            res.writeHead(400, {
              'Content-Type': 'text/plain'
            })
            res.end("Details not proper")
          } else if (result.length === 0) {
            res.writeHead(200, {
              'Content-Type': 'text/plain'
            })
            console.log("No places available")
            res.end("No places available")
          } else {
            res.writeHead(200, {
              'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(result))
          }
        })
      }
    })
  
  })


  router.post("/", function (req, res, next) {
    console.log("Trying to add a new property")
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
  
    pool.getConnection(function (err, con) {
      if (err) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end("Couldn't get a connection")
      } else {
        sql = "insert into place(owner_id,place_name,location_city,available_from,available_to,bedrooms,bathrooms,accomodates) values('" + owner_id + "','" + place_name + "','" + location_city + "','" + available_from + "','" + available_to + "','" + bedrooms + "','" + bathrooms + "','" + accomodates + "')";
        console.log(sql)
        con.query(sql, function (err, result) {
          if (err) {
            res.writeHead(400, {
              'Content-Type': 'text/plain'
            })
            console.log("place table error")
            res.end("Couldnt add details into place table")
          } else {
            var id = result.insertId
            sql = "insert into place_info(place_id,headline,description,street,apt,state,zipcode,country,price) values('" + id + "','" + headline + "','" + description + "','" + street + "','" + apt + "','" + state + "','" + zipcode + "','" + country + "','" + price + "')"
            console.log(sql)
            con.query(sql, function (err, result) {
              if (err) {
                res.writeHead(400, {
                  'Content-Type': 'text/plain'
                })
                console.log("placeinfo table error")
                res.end("Couldnt add details into placeinfo table")
              } else {
                res.writeHead(200, {
                  'Content-Type': 'text/plain'
                })
                res.end("Sucessfully added the property")
              }
            })
  
          }
        })
      }
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
  
    pool.getConnection(function (err, con) {
      if (err) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end("Couldn't get a connection")
      } else {
        sql = "update place set place_name='" + place_name + "',location_city='" + location_city + "',bedrooms='" + bedrooms + "',bathrooms='" + bathrooms + "',accomodates='" + accomodates + "' where place_id='" + property_id + "'";
        console.log(sql)
        con.query(sql, function (err, result) {
          if (err) {
            res.writeHead(400, {
              'Content-Type': 'text/plain'
            })
            console.log("place table error")
            res.end("Couldnt add details into place table")
          } else {
            sql = "update place_info set street='" + street + "',apt='" + apt + "',state='" + state + "',zipcode='" + zipcode + "',country='" + country + "',headline='" + headline + "',description='" + description + "',price='" + price + "' where place_id = '" + property_id + "'"
            console.log(sql)
            con.query(sql, function (err, result) {
              if (err) {
                res.writeHead(400, {
                  'Content-Type': 'text/plain'
                })
                console.log("placeinfo table error")
                res.end("Couldnt add details into placeinfo table")
              } else {
                res.writeHead(200, {
                  'Content-Type': 'text/plain'
                })
                res.end("Sucessfully updated the property")
              }
            })
  
          }
        })
      }
    })
  })


  router.get("/:propertyid", function (req, res, next) {
    console.log("Trying to get details of property having id: ", req.params.propertyid)
    pool.getConnection(function (err, con) {
      if (err) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end("Couldnt get connection")
      } else {
        sql = "select p.*,pi.* from place as p, place_info as pi where p.place_id = '" + req.params.propertyid + "' and p.place_id = pi.place_id"
        console.log(sql)
        con.query(sql, function (err, result) {
          if (err) {
            res.writeHead(400, {
              'Content-Type': 'text/plain'
            })
            res.end("Couldnt query from place")
          } else {
            res.writeHead(200, {
              'Content-Type': 'application/json'
            })
            console.log(JSON.stringify(result))
            res.end(JSON.stringify(result))
          }
        })
      }
    })
  })


  router.put("/:propertyid", function (req, res, next) {
    console.log("Trying to edit details of property having id: ", req.params.propertyid)
    var owner_id = req.body.owner_id
    var place_name = req.body.place_name
    var location_city = req.body.location_city
    var street = req.body.street
    var apt = req.body.apt
    var state = req.body.state
    var zipcode = req.body.zipcode
    var available_from = req.body.available_from
    var available_to = req.body.available_to
    var country = req.body.country
    var bedrooms = req.body.bedrooms
    var bathrooms = req.body.bathrooms
    var accomodates = req.body.accomodates
    var headline = req.body.headline
    var description = req.body.description
    var price = req.body.price
    pool.getConnection(function (err, con) {
      if (err) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end("Couldnt get connection")
      } else {
        sql = "update place set owner_id='" + owner_id + "', place_name='" + place_name + "', location_city='" + location_city + "', available_from='" + available_from + "', available_to='" + available_to + "', bedrooms='" + bedrooms + "', bathrooms='" + bathrooms + "', accomodates='" + accomodates + "' where place_id = '" + req.params.propertyid + "'";
        console.log(sql)
        con.query(sql, function (err, result) {
          if (err) {
            res.writeHead(400, {
              'Content-Type': 'text/plain'
            })
            res.end("Couldnt query from place")
          } else {
            sql = "update place_info set headline='" + headline + "', description='" + description + "', price='" + price + "', street='" + street + "', apt='" + apt + "', state='" + state + "', zipcode='" + zipcode + "', country='" + country + "' where place_id = '" + req.params.propertyid + "'";
            console.log(sql)
            con.query(sql, function (err, result) {
              if (err) {
                res.writeHead(400, {
                  'Content-Type': 'text/plain'
                })
                res.end("Couldnt query from place")
              } else {
                res.writeHead(200, {
                  'Content-Type': 'application/json'
                })
                console.log(JSON.stringify(result))
                res.end(JSON.stringify(result))
              }
            })
  
          }
        })
      }
    })
  })


  router.post("/:propertyid/book", function (req, res, next) {
    console.log("Trying to book property with id: ", req.params.propertyid)
    const place_id = req.body.place_id
    const travel_id = req.body.travel_id
    const booking_from = req.body.booking_from
    const booking_to = req.body.booking_to
    const guests = req.body.guests
  
    pool.getConnection(function (err, con) {
      if (err) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end("Couldnt get connection")
      } else {
        sql = "select owner_id from place where place_id='" + place_id + "'";
        console.log(sql)
        con.query(sql, function (err, result) {
          if (err) {
            res.writeHead(400, {
              'Content-Type': 'text/plain'
            })
            res.end("Couldnt get owner_id")
          } else {
            const owner_id = result[0].owner_id
            sql = "insert into booking(travel_id,owner_id,place_id,booking_from,booking_to,guests) values('" + travel_id + "','" + owner_id + "','" + place_id + "','" + booking_from + "','" + booking_to + "','" + guests + "')"
            console.log(sql);
            con.query(sql, function (err, result) {
              if (err) {
                res.writeHead(400, {
                  'Content-Type': 'text/plain'
                })
                console
                res.end("Couldnt add details")
              } else {
                res.writeHead(200, {
                  'Content-Type': 'text/plain'
                })
                res.end("Booked")
              }
            })
          }
        })
      }
    })
  })


  router.post("/upload", function (req, res, next) {
    console.log("Trying to upload multiple images")
    var imagePaths = "";
    for (let i = 0; i <= req.body.totalImages; i++) {
  
      console.log(req.files["image" + i])
      imageFile = req.files["image" + i]
      imageFile.mv(`./public/uploads/property-${i}${path.extname(imageFile.name)}`, function (err) {
        if (err) {
          console.log(err)
          return res.status(500).send(err);
        } else {
          imagePaths = imagePaths + "./public/uploads/property-" + i + "" + path.extname(imageFile.name) + ","
          console.log(imagePaths.split(","))
        }
      })
    }
    res.send(200)
  })



  module.exports = router
