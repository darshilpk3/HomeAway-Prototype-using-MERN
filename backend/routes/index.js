var express = require('express');
var router = express.Router();
var pool = require('../pool');
var mysql = require('mysql');
var md5 = require('md5');
var cookieParser = require('cookie-parser')

//router.use(cookieParser())
router.post('/login', function (req, res, next) {

  console.log("Inside Login Post Request");
  var email = req.body.email;
  var password = md5(req.body.password);
  var sql = "SELECT *  FROM traveluserinfo WHERE email = " +mysql.escape(email)+ "and password = " +mysql.escape(password)+"";
  console.log(email,password)
  pool.getConnection(function (err, con) {
    if (err) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function (err, result) {
        console.log(result)
        if (err) {
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end("Invalid Credentials");
        }else if(result.length===0){
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end("Invalid Credentials");
        } 
        else {
          
          responsedata = {
            "email":result[0].email,
            "password":result[0].password,
            "firstname":result[0].firstname,
            "lastname":result[0].lastname,
          }
          req.session.user = responsedata;
          res.cookie("loginuser",JSON.stringify(responsedata),{
            maxAge:900000,
            httpOnly: false,
            path:'/'
          })
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end(JSON.stringify(responsedata));
        }
      });
    }
  });
});

router.post('/signup', function (req, res, next) {
  console.log("Inside signup Post Request");
  var email = req.body.email;
  var password = md5(req.body.password);
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;

  var sql = "insert into traveluserinfo(email,password,firstname,lastname) values('" + email + "','" + password + "','" + firstname + "','" + lastname + "')";

  pool.getConnection(function (err, con) {
    if (err) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function (err, result) {
        if (err) {
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end("Could not add the user");
        } else {
          //req.session.user = result;
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end("Successful added");
        }
      });
    }
  });
})
module.exports = router;
