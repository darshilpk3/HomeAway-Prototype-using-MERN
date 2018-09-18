var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


app.post("/solve",function(req,res,next){
    try{
        let answer = eval(req.body.evalString)
        if(answer.toString()==="Infinity"){
            throw SyntaxError;
        }
        else{
            res.writeHead(200,{
                'Content-Type':'text/plain'
            })
            res.end(answer.toString())
        }
        
    }
    catch(e){
        res.writeHead(200,{
            'Content-Type':'text/plain'
        })
        res.end("Invalid Input")
    }
})

app.listen(3001)
