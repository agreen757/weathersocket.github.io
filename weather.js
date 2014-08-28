var express = require('express');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var Server = require('mongodb').Server;
var MONGOHQ_URL="mongodb://worker:walton@oceanic.mongohq.com:10048/partyofme";
var io = require('socket.io');
var cons = require('consolidate');
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname+"/views");
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
//app.use(express.session({secret: '1234567890ADRIAN'}));
app.use(bodyParser());
//app.use(express.methodOverride());

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

//Open DB connection
MongoClient.connect(MONGOHQ_URL, function(err, db){
    
//*********INTRO PAGE
    
app.get('/', function(request, response){
    response.render('index');
});
    
app.post('/signup', function(request, response){
    console.log(request.body)
    db.collection('weatherUsers').update({email:request.body.email},{$set:{email:request.body.email}},{upsert:true}, function(err,res){
                if(err){console.log(err)}
                console.log(res);
            })
    response.render('index',{signup:"Thanks!  You will be receiving an email with further instructions"})
})
    
    server.listen(4000);
    console.log("Express server started on 4000");
})

/*sort out how to load many locations with updated information

https://developers.google.com/maps/documentation/javascript/examples/icon-complex
this link will allow me to load many icons but how do I load the sockets for each data point?

http://stackoverflow.com/questions/13695046/watch-a-folder-for-changes-using-node-js-and-print-file-paths-when-they-are-cha

Use this to watch the whole directory instead and report changes on each one.  Updating a socket.

*/