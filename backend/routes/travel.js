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
    var password = (req.body.password);
    console.log(email, password)
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            var sql = "SELECT *  FROM traveluser WHERE email = " + mysql.escape(email) + "";
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
                } else {

                    if (bcrypt.compareSync(password, result[0].password)) {
                        responsedata = {
                            "email": result[0].email,
                            "password": result[0].password,
                            "firstname": result[0].firstname,
                            "lastname": result[0].lastname,
                        }
                        req.session.user = responsedata;
                        res.cookie("loginuser", result[0].travel_id, {
                            maxAge: 900000,
                            httpOnly: false,
                            path: '/'
                        })
                        res.cookie("loginemail", result[0].email, {
                            maxAge: 900000,
                            httpOnly: false,
                            path: '/',
                            overwrite: true
                        })
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        })
                        res.end(JSON.stringify(responsedata));
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
    var password = bcrypt.hashSync(req.body.password, 10);
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;


    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            var sql = "insert into traveluser(email,password) values('" + email + "','" + password + "')";
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could not add the user");
                } else {
                    var id = result.insertId;
                    var sql = "insert into traveluserinfo(travel_id,firstname,lastname) values('" + id + "','" + firstname + "','" + lastname + "')";
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


router.get("/:travelid", function (req, res, next) {
    console.log("getting details of user having id: " + req.params.travelid)
    pool.getConnection(function (err, con) {
        if (err) {
            console.log("error in getting connection")
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Couldnt get a connection")
        } else {
            sql = "select email,password,firstname,lastname,school,company,number,address,profilepic,aboutme,languages,gender from traveluser,traveluserinfo where traveluser.travel_id=" + req.params.travelid + " and traveluser.travel_id=traveluserinfo.travel_id";
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


router.put("/:travelid", function (req, res, next) {
    console.log("changing user details")
    var email = req.body.email;
    var password = bcrypt.hashSync(req.body.password, 10);
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var school = req.body.school;
    var company = req.body.company;
    var address = req.body.address;
    var number = req.body.number;
    var aboutme = req.body.aboutme;
    var languages = req.body.languages;
    var gender = req.body.gender;

    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Couldnt get a connection")
        } else {
            sql = "update traveluser set email='" + email + "' where travel_id='" + req.params.travelid + "'";
            console.log(sql)
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("something wrong with data while entering email and " + sql)
                } else {
                    sql = "update traveluserinfo set firstname='" + firstname + "',lastname='" + lastname + "',school='" + school + "',company='" + company + "',address='" + address + "',number='" + number + "',aboutme='" + aboutme + "',languages='" + languages + "',gender='" + gender + "' where travel_id=" + req.params.travelid;
                    con.query(sql, function (err, result) {
                        if (err) {
                            res.writeHead(400, {
                                'Content-Type': 'text/plain'
                            })
                            res.end("something wrong with data while entering other details")
                        } else {

                            res.cookie("loginemail", email, {
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

router.put("/editpassword/:travelid", function (req, res, next) {
    console.log("changing user details")
    var password = bcrypt.hashSync(req.body.password, 10);
    console.log(password)

    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Couldnt get a connection")
        } else {
            sql = "update traveluser set password='" + password + "' where travel_id='" + req.params.travelid + "'";
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


router.get("/:travel_id/bookingdetails", function (req, res, next) {
    console.log("Trying to fetch booking details")
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Couldnt get connection")
        } else {
            sql = "select p.*,pi.*,b.* from place as p,place_info as pi, booking as b where p.place_id in (select place_id from booking where travel_id='" + req.params.travel_id + "') and p.place_id = pi.place_id and p.place_id = b.place_id";
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

router.post("/upload", function (req, res, next) {
    console.log("trying to upload a file");
    console.log(req.body.email)
    let imageFile = req.files.selectedFile
    console.log(imageFile.name);
    imageFile.mv(`./public/uploads/userprofile-${req.body.id}${path.extname(imageFile.name)}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        } else {
            pool.getConnection(function (err, con) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    res.end("Couldnt get connection")
                } else {
                    sql = `update traveluserinfo set profilepic='/public/uploads/userprofile-${req.body.id}${path.extname(imageFile.name)}'`;
                    console.log(sql);
                    con.query(sql, function (err, result) {
                        if (err) {
                            res.writeHead(400, {
                                'Content-Type': 'text/plain'
                            });
                        } else {
                            res.writeHead(200, {
                                'Content-Type': 'text/plain'
                            });
                            console.log(`public/uploads/userprofile-${req.body.id}${path.extname(imageFile.name)}`)
                            res.end(`public/uploads/userprofile-${req.body.id}${path.extname(imageFile.name)}`)
                        }
                    })
                }
            })
        }
    })
})

module.exports = router