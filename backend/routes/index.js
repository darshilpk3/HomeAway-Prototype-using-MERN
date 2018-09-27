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
  console.log(email, password)
  pool.getConnection(function (err, con) {
    if (err) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      var sql = "SELECT *  FROM traveluser WHERE email = " + mysql.escape(email) + "and password = " + mysql.escape(password) + "";
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
            overwrite:true
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

router.get("/edit/:travelid", function (req, res, next) {
  console.log("getting details of user having id: " + req.params.travelid)
  pool.getConnection(function (err, con) {
    if (err) {
      console.log("error in getting connection")
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Couldnt get a connection")
    } else {
      sql = "select email,firstname,lastname,school,company,number,address from traveluser,traveluserinfo where traveluser.travel_id=" + req.params.travelid + " and traveluser.travel_id=traveluserinfo.travel_id";
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

router.post("/edit/:travelid",function(req,res,next){
  console.log("changing user details")
  var email = req.body.email;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var school = req.body.school;
  var company = req.body.company;
  var address = req.body.address;
  var number = req.body.number;

  pool.getConnection(function(err,con){
    if(err){
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Couldnt get a connection")
    }else{
      sql = "update traveluser set email='"+email+"' where travel_id='"+req.params.travelid+"'";
      console.log(sql)
      con.query(sql,function(err,result){
        if(err){
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          })
          res.end("something wrong with data while entering email and "+sql)
        }else{
          sql = "update traveluserinfo set firstname='"+firstname+"',lastname='"+lastname+"',school='"+school+"',company='"+company+"',address='"+address+"',number='"+number+"' where travel_id="+req.params.travelid;
          con.query(sql,function(err,result){
            if(err){
              res.writeHead(400, {
                'Content-Type': 'text/plain'
              })
              res.end("something wrong with data while entering other details")
            }else{
              
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

router.post("/search",function(req,res,next){
  console.log("inside post search")
  var place = req.body.place
  var available_from = req.body.available_from
  var available_to = req.body.available_to
  var accomodates = req.body.accomodates

  pool.getConnection(function(err,con){
    if(err){
      res.writeHead(400,{
        'Content-Type':'text/plain'
      })
      res.end("Couldnt get a connection")
    }else{
      sql = "select * from place where (location_city='"+place+"') and ('"+available_from+"' between available_from and available_to) and ('"+available_to+"' between available_from and available_to) and (accomodates>='"+accomodates+"')"
      console.log(sql);
      con.query(sql,function(err,result){
        if(err){
          res.writeHead(400,{
            'Content-Type':'text/plain'
          })
          res.end("Details not proper")
        }else if(result.length===0){
          res.writeHead(200,{
            'Content-Type':'text/plain'
          })
          res.end("No places available")
        }else{
          console.log(result)
          res.writeHead(200,{
            'Content-Type':'application/json'
          })
          res.end(JSON.stringify(result))
        }
      })
    }
  })
  
})

module.exports = router;
