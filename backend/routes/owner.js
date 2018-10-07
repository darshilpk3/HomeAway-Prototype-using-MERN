var express = require('express');
var router = express.Router();
var pool = require('../pool');
var mysql = require('mysql');
var md5 = require('md5');
var path = require('path')
var multer = require('multer')
var bcrypt = require('bcryptjs')
var cookieParser = require('cookie-parser')

router.post('/login', function (req, res, next) {

    console.log("Inside Login Post Request");
    var email = req.body.email;
    var password = req.body.password;
    console.log(email, password)
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            var sql = "SELECT *  FROM owneruser WHERE email = " + mysql.escape(email) + "";
            con.query(sql, function (err, result) {
                console.log(result)
                if (err) {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Invalid Credentials");
                } else if (result.length === 0) {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }
                else {
                    if (bcrypt.compareSync(password, result[0].password)) {
                        responsedata = {
                            "email": result[0].email,
                            "password": result[0].password,
                            "firstname": result[0].firstname,
                            "lastname": result[0].lastname,
                        }
                        req.session.user = responsedata;
                        res.cookie("ownerlogin", result[0].owner_id, {
                            maxAge: 900000,
                            httpOnly: false,
                            path: '/'
                        })
                        res.cookie("owneremail", result[0].email, {
                            maxAge: 900000,
                            httpOnly: false,
                            path: '/',
                            overwrite: true
                        })
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        })
                        res.end(JSON.stringify(responsedata) + "Succesfully logged in");
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        })
                        res.end("Invalid Credentials");
                    }


                }
            });
        }
    });
});


router.post('/signup', function (req, res, next) {
    console.log("Inside signup Post Request");
    var email = req.body.email;
    var password = bcrypt.hashSync(req.body.password);
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;


    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            var sql = "insert into owneruser(email,password) values('" + email + "','" + password + "')";
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could not add the user");
                } else {
                    var id = result.insertId;
                    var sql = "insert into owneruserinfo(owner_id,firstname,lastname) values('" + id + "','" + firstname + "','" + lastname + "')";
                    con.query(sql, function (err, result) {
                        if (err) {
                            res.writeHead(200, {
                                'Content-Type': 'text/plain'
                            })
                            res.end("Something wrong with data");
                        } else {
                            res.writeHead(200, {
                                'Content-Type': 'text/plain'
                            })
                            res.end("Successful added");
                        }
                    })
                }
            });
        }
    });
})


router.get("/:ownerid", function (req, res, next) {
    console.log("getting details of user having id: " + req.params.ownerid)
    pool.getConnection(function (err, con) {
        if (err) {
            console.log("error in getting connection")
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Couldnt get a connection")
        } else {
            sql = "select email,firstname,lastname,company,billing_address,city,state,zipcode,country,number from owneruser,owneruserinfo where owneruser.owner_id=" + req.params.ownerid + " and owneruser.owner_id=owneruserinfo.owner_id";
            con.query(sql, function (err, result) {
                if (err) {
                    console.log("error in select query")
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Couldnt fetch data")
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


router.put("/:ownerid/editpassword", function (req, res, next) {
    console.log("changing owner details")
    var password = bcrypt.hashSync(req.body.password, 10);

    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Couldnt get a connection")
        } else {
            sql = "update owneruser set password='" + password + "' where owner_id='" + req.params.ownerid + "'";
            console.log(sql)
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("something wrong with data while entering email and " + sql)
                } else {

                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successfully updated")
                }
            })
        }
    })
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

    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Couldnt get a connection")
        } else {
            sql = "update owneruser set email='" + email + "' where owner_id='" + req.params.ownerid + "'";
            console.log(sql)
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("something wrong with data while entering email and " + sql)
                } else {
                    sql = "update owneruserinfo set firstname='" + firstname + "',lastname='" + lastname + "',company='" + company + "',billing_address='" + address + "',city='" + city + "',state='" + state + "',zipcode='" + zipcode + "',country='" + country + "',number='" + number + "' where owner_id=" + req.params.ownerid;
                    console.log(sql)
                    con.query(sql, function (err, result) {
                        if (err) {
                            res.writeHead(400, {
                                'Content-Type': 'text/plain'
                            })
                            res.end("something wrong with data while entering other details")
                        } else {

                            res.cookie("owneremail", email, {
                                maxAge: 900000,
                                httpOnly: false,
                            })
                            res.writeHead(200, {
                                'Content-Type': 'text/plain'
                            })
                            res.end("Successfully updated")
                        }
                    })
                }
            })
        }
    })
})

router.get("/:owner_id/property/", function (req, res, next) {
    console.log("Trying to get properties listed by owner id: ", req.params.owner_id)
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Couldnt get connection")
        } else {
            sql = "select p.*,pi.* from place as p, place_info as pi where p.owner_id='" + req.params.owner_id + "' and p.place_id=pi.place_id";
            console.log(sql)
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Couldnt get details")
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    console.log(JSON.stringify(result))
                    res.end(JSON.stringify(result))
                }
            })
        }
    })
})


router.get("/:owner_id/dashboard", function (req, res, next) {
    console.log("Trying to fetch booking details")
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Couldnt get connection")
        } else {
            sql = "select p.*,pi.*,ti.*,new.* from place as p, place_info as pi, traveluserinfo as ti,(select * from booking where owner_id='" + req.params.owner_id + "') as new where p.place_id in (new.place_id) and p.place_id = pi.place_id and ti.travel_id in( new.travel_id)"
            //sql = "select p.*,pi.* from place as p,place_info as pi where p.owner_id='"+req.params.owner_id+"' and p.place_id = pi.place_id"
            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Couldnt get connection")
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

module.exports = router
