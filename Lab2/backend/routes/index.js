var express = require('express');
var router = express.Router();
var pool = require('../pool');
var mysql = require('mysql');
var md5 = require('md5');
var path = require('path')
var multer = require('multer')
var cookieParser = require('cookie-parser')

//router.use(cookieParser())
// router.post('/login', function (req, res, next) {

//   console.log("Inside Login Post Request");
//   var email = req.body.email;
//   var password = md5(req.body.password);
//   console.log(email, password)
//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Could Not Get Connection Object");
//     } else {
//       var sql = "SELECT *  FROM traveluser WHERE email = " + mysql.escape(email) + "and password = " + mysql.escape(password) + "";
//       con.query(sql, function (err, result) {
//         console.log(result)
//         if (err) {
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Invalid Credentials");
//         } else if (result.length === 0) {
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Invalid Credentials");
//         }
//         else {

//           responsedata = {
//             "email": result[0].email,
//             "password": result[0].password,
//             "firstname": result[0].firstname,
//             "lastname": result[0].lastname,
//           }
//           req.session.user = responsedata;
//           res.cookie("loginuser", result[0].travel_id, {
//             maxAge: 900000,
//             httpOnly: false,
//             path: '/'
//           })
//           res.cookie("loginemail", result[0].email, {
//             maxAge: 900000,
//             httpOnly: false,
//             path: '/',
//             overwrite: true
//           })
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end(JSON.stringify(responsedata));
//         }
//       });
//     }
//   });
// });
// /////////////////////////////////////////////////////
// router.post('/owner/login', function (req, res, next) {

//   console.log("Inside Login Post Request");
//   var email = req.body.email;
//   var password = md5(req.body.password);
//   console.log(email, password)
//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Could Not Get Connection Object");
//     } else {
//       var sql = "SELECT *  FROM owneruser WHERE email = " + mysql.escape(email) + "and password = " + mysql.escape(password) + "";
//       con.query(sql, function (err, result) {
//         console.log(result)
//         if (err) {
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Invalid Credentials");
//         } else if (result.length === 0) {
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Invalid Credentials");
//         }
//         else {

//           responsedata = {
//             "email": result[0].email,
//             "password": result[0].password,
//             "firstname": result[0].firstname,
//             "lastname": result[0].lastname,
//           }
//           req.session.user = responsedata;
//           res.cookie("ownerlogin", result[0].owner_id, {
//             maxAge: 900000,
//             httpOnly: false,
//             path: '/'
//           })
//           res.cookie("owneremail", result[0].email, {
//             maxAge: 900000,
//             httpOnly: false,
//             path: '/',
//             overwrite: true
//           })
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end(JSON.stringify(responsedata) + "Succesfully logged in");
//         }
//       });
//     }
//   });
// });

// /////////////////////////////////////////////////////
// router.post('/signup', function (req, res, next) {
//   console.log("Inside signup Post Request");
//   var email = req.body.email;
//   var password = md5(req.body.password);
//   var firstname = req.body.firstname;
//   var lastname = req.body.lastname;


//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Could Not Get Connection Object");
//     } else {
//       var sql = "insert into traveluser(email,password) values('" + email + "','" + password + "')";
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Could not add the user");
//         } else {
//           var id = result.insertId;
//           var sql = "insert into traveluserinfo(travel_id,firstname,lastname) values('" + id + "','" + firstname + "','" + lastname + "')";
//           con.query(sql, function (err, result) {
//             if (err) {
//               res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//               })
//               res.end("Something wrong with data");
//             } else {
//               res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//               })
//               res.end("Successful added");
//             }
//           })
//         }
//       });
//     }
//   });
// })
// /////////////////////////////////////////////////////////////
// router.post('/owner/signup', function (req, res, next) {
//   console.log("Inside signup Post Request");
//   var email = req.body.email;
//   var password = md5(req.body.password);
//   var firstname = req.body.firstname;
//   var lastname = req.body.lastname;


//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Could Not Get Connection Object");
//     } else {
//       var sql = "insert into owneruser(email,password) values('" + email + "','" + password + "')";
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Could not add the user");
//         } else {
//           var id = result.insertId;
//           var sql = "insert into owneruserinfo(owner_id,firstname,lastname) values('" + id + "','" + firstname + "','" + lastname + "')";
//           con.query(sql, function (err, result) {
//             if (err) {
//               res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//               })
//               res.end("Something wrong with data");
//             } else {
//               res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//               })
//               res.end("Successful added");
//             }
//           })
//         }
//       });
//     }
//   });
// })
// /////////////////////////////////////////////////////////////
// router.get("/edit/:travelid", function (req, res, next) {
//   console.log("getting details of user having id: " + req.params.travelid)
//   pool.getConnection(function (err, con) {
//     if (err) {
//       console.log("error in getting connection")
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Couldnt get a connection")
//     } else {
//       sql = "select email,password,firstname,lastname,school,company,number,address,profilepic from traveluser,traveluserinfo where traveluser.travel_id=" + req.params.travelid + " and traveluser.travel_id=traveluserinfo.travel_id";
//       con.query(sql, function (err, result) {
//         if (err) {
//           console.log("error in select query")
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Couldnt fetch data")
//         } else {
//           res.writeHead(200, {
//             'Content-Type': 'application/json'
//           })
//           res.end(JSON.stringify(result))
//         }
//       })
//     }
//   })
// })


// /////////////////////////////////////////////////////
// router.get("/owner/edit/:ownerid", function (req, res, next) {
//   console.log("getting details of user having id: " + req.params.ownerid)
//   pool.getConnection(function (err, con) {
//     if (err) {
//       console.log("error in getting connection")
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Couldnt get a connection")
//     } else {
//       sql = "select email,firstname,lastname,company,billing_address,city,state,zipcode,country,number from owneruser,owneruserinfo where owneruser.owner_id=" + req.params.ownerid + " and owneruser.owner_id=owneruserinfo.owner_id";
//       con.query(sql, function (err, result) {
//         if (err) {
//           console.log("error in select query")
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Couldnt fetch data")
//         } else {
//           res.writeHead(200, {
//             'Content-Type': 'application/json'
//           })
//           res.end(JSON.stringify(result))
//         }
//       })
//     }
//   })
// })

// /////////////////////////////////////////////////////
// router.post("/edit/:travelid", function (req, res, next) {
//   console.log("changing user details")
//   var email = req.body.email;
//   var password = md5(req.body.password);
//   var firstname = req.body.firstname;
//   var lastname = req.body.lastname;
//   var school = req.body.school;
//   var company = req.body.company;
//   var address = req.body.address;
//   var number = req.body.number;

//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Couldnt get a connection")
//     } else {
//       sql = "update traveluser set email='" + email + "' where travel_id='" + req.params.travelid + "'";
//       console.log(sql)
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("something wrong with data while entering email and " + sql)
//         } else {
//           sql = "update traveluserinfo set firstname='" + firstname + "',lastname='" + lastname + "',school='" + school + "',company='" + company + "',address='" + address + "',number='" + number + "' where travel_id=" + req.params.travelid;
//           con.query(sql, function (err, result) {
//             if (err) {
//               res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//               })
//               res.end("something wrong with data while entering other details")
//             } else {

//               res.cookie("loginemail", email, {
//                 maxAge: 900000,
//                 httpOnly: false,
//               })
//               res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//               })
//               res.end("Successfully updated")
//             }
//           })
//         }
//       })
//     }
//   })
// })

// router.post("/editpassword/:travelid", function (req, res, next) {
//   console.log("changing user details")
//   var password = md5(req.body.password);

//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Couldnt get a connection")
//     } else {
//       sql = "update traveluser set password='" + password + "' where travel_id='" + req.params.travelid + "'";
//       console.log(sql)
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("something wrong with data while entering email and " + sql)
//         } else {

//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Successfully updated")
//         }
//       })
//     }
//   })
// })

// router.post("/owner/editpassword/:ownerid", function (req, res, next) {
//   console.log("changing owner details")
//   var password = md5(req.body.password);

//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Couldnt get a connection")
//     } else {
//       sql = "update owneruser set password='" + password + "' where owner_id='" + req.params.ownerid + "'";
//       console.log(sql)
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("something wrong with data while entering email and " + sql)
//         } else {

//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Successfully updated")
//         }
//       })
//     }
//   })
// })

// //////////////////////////////////////////////////////
// router.post("/owner/edit/:ownerid", function (req, res, next) {
//   console.log("changing owner details")
//   var email = req.body.email;
//   var firstname = req.body.firstname;
//   var lastname = req.body.lastname;
//   var company = req.body.company;
//   var address = req.body.address;
//   var city = req.body.city;
//   var state = req.body.state;
//   var zipcode = req.body.zipcode;
//   var country = req.body.country;
//   var number = req.body.number;

//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Couldnt get a connection")
//     } else {
//       sql = "update owneruser set email='" + email + "' where owner_id='" + req.params.ownerid + "'";
//       console.log(sql)
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("something wrong with data while entering email and " + sql)
//         } else {
//           sql = "update owneruserinfo set firstname='" + firstname + "',lastname='" + lastname + "',company='" + company + "',billing_address='" + address + "',city='" + city + "',state='" + state + "',zipcode='" + zipcode + "',country='" + country + "',number='" + number + "' where owner_id=" + req.params.ownerid;
//           console.log(sql)
//           con.query(sql, function (err, result) {
//             if (err) {
//               res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//               })
//               res.end("something wrong with data while entering other details")
//             } else {

//               res.cookie("owneremail", email, {
//                 maxAge: 900000,
//                 httpOnly: false,
//               })
//               res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//               })
//               res.end("Successfully updated")
//             }
//           })
//         }
//       })
//     }
//   })
// })
// //////////////////////////////////////////////////////
// router.post("/search", function (req, res, next) {
//   console.log("inside post search")
//   var place = req.body.place
//   var available_from = req.body.available_from
//   var available_to = req.body.available_to
//   var accomodates = req.body.accomodates

//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Couldnt get a connection")
//     } else {
//       //sql = "select _id from booking where _id in (select _id from place where (location_city='"+place+"') and ('"+available_from+"' between available_from and available_to) and ('"+available_to+"' between available_from and available_to) and (accomodates>='"+accomodates+"')) and ('"+available_from+"' not between booking_from and booking_to) and ('"+available_to+"' not between booking_from and booking_to)"
//       sql = "select p.*,pi.* from place as p,place_info as pi where (p.location_city='" + place + "') and ('" + available_from + "' between p.available_from and p.available_to) and ('" + available_to + "' between p.available_from and p.available_to) and (p.accomodates>='" + accomodates + "') and p._id not in (select _id from booking where ('" + available_from + "' between booking_from and booking_to) or ('" + available_to + "' between booking_from and booking_to)) and p._id=pi._id"
//       console.log(sql);
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Details not proper")
//         } else if (result.length === 0) {
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           console.log("No places available")
//           res.end("No places available")
//         } else {
//           res.writeHead(200, {
//             'Content-Type': 'application/json'
//           })
//           res.end(JSON.stringify(result))
//         }
//       })
//     }
//   })

// })

// router.post("/owner/property", function (req, res, next) {
//   console.log("Trying to add a new property")
//   var owner_id = req.body.owner_id
//   var place_name = req.body.place_name
//   var street = req.body.street
//   var apt = req.body.apt
//   var state = req.body.state
//   var zipcode = req.body.zipcode
//   var country = req.body.country
//   var location_city = req.body.location_city
//   var available_from = req.body.available_from
//   var available_to = req.body.available_to
//   var bedrooms = req.body.bedrooms
//   var bathrooms = req.body.bathrooms
//   var accomodates = req.body.accomodates
//   var headline = req.body.headline
//   var description = req.body.description
//   var price = req.body.price

//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Couldn't get a connection")
//     } else {
//       sql = "insert into place(owner_id,place_name,location_city,available_from,available_to,bedrooms,bathrooms,accomodates) values('" + owner_id + "','" + place_name + "','" + location_city + "','" + available_from + "','" + available_to + "','" + bedrooms + "','" + bathrooms + "','" + accomodates + "')";
//       console.log(sql)
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           console.log("place table error")
//           res.end("Couldnt add details into place table")
//         } else {
//           var id = result.insertId
//           sql = "insert into place_info(_id,headline,description,street,apt,state,zipcode,country,price) values('" + id + "','" + headline + "','" + description + "','" + street + "','" + apt + "','" + state + "','" + zipcode + "','" + country + "','" + price + "')"
//           console.log(sql)
//           con.query(sql, function (err, result) {
//             if (err) {
//               res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//               })
//               console.log("placeinfo table error")
//               res.end("Couldnt add details into placeinfo table")
//             } else {
//               res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//               })
//               res.end("Sucessfully added the property")
//             }
//           })

//         }
//       })
//     }
//   })
// })


// router.post("/owner/property/:property_id", function (req, res, next) {
//   console.log("Trying to add a new property")
//   var property_id = req.params.property_id
//   var owner_id = req.body.owner_id
//   var place_name = req.body.place_name
//   var location_city = req.body.location_city
//   var street = req.body.street
//   var apt = req.body.apt
//   var state = req.body.state
//   var zipcode = req.body.zipcode
//   var country = req.body.country
//   var bedrooms = req.body.bedrooms
//   var bathrooms = req.body.bathrooms
//   var accomodates = req.body.accomodates
//   var headline = req.body.headline
//   var description = req.body.description
//   var price = req.body.price

//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Couldn't get a connection")
//     } else {
//       sql = "update place set place_name='" + place_name + "',location_city='" + location_city + "',bedrooms='" + bedrooms + "',bathrooms='" + bathrooms + "',accomodates='" + accomodates + "' where _id='" + property_id + "'";
//       console.log(sql)
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           console.log("place table error")
//           res.end("Couldnt add details into place table")
//         } else {
//           sql = "update place_info set street='" + street + "',apt='" + apt + "',state='" + state + "',zipcode='" + zipcode + "',country='" + country + "',headline='" + headline + "',description='" + description + "',price='" + price + "' where _id = '" + property_id + "'"
//           console.log(sql)
//           con.query(sql, function (err, result) {
//             if (err) {
//               res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//               })
//               console.log("placeinfo table error")
//               res.end("Couldnt add details into placeinfo table")
//             } else {
//               res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//               })
//               res.end("Sucessfully updated the property")
//             }
//           })

//         }
//       })
//     }
//   })
// })

// router.get("/owner/:owner_id/property/", function (req, res, next) {
//   console.log("Trying to get properties listed by owner id: ", req.params.owner_id)
//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Couldnt get connection")
//     } else {
//       sql = "select p.*,pi.* from place as p, place_info as pi where p.owner_id='" + req.params.owner_id + "' and p._id=pi._id";
//       console.log(sql)
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Couldnt get details")
//         } else {
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           console.log(JSON.stringify(result))
//           res.end(JSON.stringify(result))
//         }
//       })
//     }
//   })
// })

// router.get("/property/:propertyid", function (req, res, next) {
//   console.log("Trying to get details of property having id: ", req.params.propertyid)
//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Couldnt get connection")
//     } else {
//       sql = "select p.*,pi.* from place as p, place_info as pi where p._id = '" + req.params.propertyid + "' and p._id = pi._id"
//       console.log(sql)
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Couldnt query from place")
//         } else {
//           res.writeHead(200, {
//             'Content-Type': 'application/json'
//           })
//           console.log(JSON.stringify(result))
//           res.end(JSON.stringify(result))
//         }
//       })
//     }
//   })
// })

// //////////////////////////////////////////////////////////////////////
// router.put("/property/:propertyid", function (req, res, next) {
//   console.log("Trying to edit details of property having id: ", req.params.propertyid)
//   var owner_id = req.body.owner_id
//   var place_name = req.body.place_name
//   var location_city = req.body.location_city
//   var street = req.body.street
//   var apt = req.body.apt
//   var state = req.body.state
//   var zipcode = req.body.zipcode
//   var available_from = req.body.available_from
//   var available_to = req.body.available_to
//   var country = req.body.country
//   var bedrooms = req.body.bedrooms
//   var bathrooms = req.body.bathrooms
//   var accomodates = req.body.accomodates
//   var headline = req.body.headline
//   var description = req.body.description
//   var price = req.body.price
//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Couldnt get connection")
//     } else {
//       sql = "update place set owner_id='" + owner_id + "', place_name='" + place_name + "', location_city='" + location_city + "', available_from='" + available_from + "', available_to='" + available_to + "', bedrooms='" + bedrooms + "', bathrooms='" + bathrooms + "', accomodates='" + accomodates + "' where _id = '" + req.params.propertyid + "'";
//       console.log(sql)
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Couldnt query from place")
//         } else {
//           sql = "update place_info set headline='" + headline + "', description='" + description + "', price='" + price + "', street='" + street + "', apt='" + apt + "', state='" + state + "', zipcode='" + zipcode + "', country='" + country + "' where _id = '" + req.params.propertyid + "'";
//           console.log(sql)
//           con.query(sql, function (err, result) {
//             if (err) {
//               res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//               })
//               res.end("Couldnt query from place")
//             } else {
//               res.writeHead(200, {
//                 'Content-Type': 'application/json'
//               })
//               console.log(JSON.stringify(result))
//               res.end(JSON.stringify(result))
//             }
//           })

//         }
//       })
//     }
//   })
// })
// //////////////////////////////////////////////////////////////////////
// router.post("/property/:propertyid/book", function (req, res, next) {
//   console.log("Trying to book property with id: ", req.params.propertyid)
//   const _id = req.body._id
//   const travel_id = req.body.travel_id
//   const booking_from = req.body.booking_from
//   const booking_to = req.body.booking_to
//   const guests = req.body.guests

//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Couldnt get connection")
//     } else {
//       sql = "select owner_id from place where _id='" + _id + "'";
//       console.log(sql)
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Couldnt get owner_id")
//         } else {
//           const owner_id = result[0].owner_id
//           sql = "insert into booking(travel_id,owner_id,_id,booking_from,booking_to,guests) values('" + travel_id + "','" + owner_id + "','" + _id + "','" + booking_from + "','" + booking_to + "','" + guests + "')"
//           console.log(sql);
//           con.query(sql, function (err, result) {
//             if (err) {
//               res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//               })
//               console
//               res.end("Couldnt add details")
//             } else {
//               res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//               })
//               res.end("Booked")
//             }
//           })
//         }
//       })
//     }
//   })
// })






// router.get("/bookingdetails/:travel_id", function (req, res, next) {
//   console.log("Trying to fetch booking details")
//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Couldnt get connection")
//     } else {
//       sql = "select p.*,pi.*,b.* from place as p,place_info as pi, booking as b where p._id in (select _id from booking where travel_id='" + req.params.travel_id + "') and p._id = pi._id and p._id = b._id";
//       console.log(sql);
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Couldnt get connection")
//         } else {
//           res.writeHead(200, {
//             'Content-Type': 'application/json'
//           })
//           console.log(JSON.stringify(result))
//           res.end(JSON.stringify(result))
//         }
//       })
//     }
//   })
// })


// router.get("/owner/dashboard/:owner_id", function (req, res, next) {
//   console.log("Trying to fetch booking details")
//   pool.getConnection(function (err, con) {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Couldnt get connection")
//     } else {
//       sql = "select p.*,pi.*,ti.*,new.* from place as p, place_info as pi, traveluserinfo as ti,(select * from booking where owner_id='" + req.params.owner_id + "') as new where p._id in (new._id) and p._id = pi._id and ti.travel_id in( new.travel_id)"
//       //sql = "select p.*,pi.* from place as p,place_info as pi where p.owner_id='"+req.params.owner_id+"' and p._id = pi._id"
//       console.log(sql);
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("Couldnt get connection")
//         } else {
//           res.writeHead(200, {
//             'Content-Type': 'application/json'
//           })
//           console.log(JSON.stringify(result))
//           res.end(JSON.stringify(result))
//         }
//       })
//     }
//   })
// })

// router.post("/upload", function (req, res, next) {
//   console.log("trying to upload a file");
//   console.log(req.body.email)
//   let imageFile = req.files.selectedFile
//   console.log(imageFile.name);
//   imageFile.mv(`./public/uploads/userprofile-${req.body.id}${path.extname(imageFile.name)}`, function (err) {
//     if (err) {
//       console.log(err)
//       return res.status(500).send(err);
//     } else {
//       pool.getConnection(function (err, con) {
//         if (err) {
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           });
//           res.end("Couldnt get connection")
//         } else {
//           sql = `insert into traveluserinfo(profilepic) values('./public/uploads/user-${req.body.id}/profile${path.extname(imageFile.name)}')`;
//           console.log(sql);
//           con.query(sql, function (err, result) {
//             if (err) {
//               res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//               });
//             } else {
//               res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//               });
//               console.log(`public/uploads/userprofile-${req.body.id}${path.extname(imageFile.name)}`)
//               res.end(`public/uploads/userprofile-${req.body.id}${path.extname(imageFile.name)}`)
//             }
//           })
//         }
//       })
//     }
//   })
// })

// router.post("/properties/upload", function (req, res, next) {
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


module.exports = router;
