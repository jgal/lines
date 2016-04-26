/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
/*globals ibmdb:true */
var express = require('express');
var redis = require('redis');

//initial setup

if (process.env.VCAP_SERVICES) {
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var credentials = env['redis-2.6'][0]['credentials'];
} else {
  var credentials = {"host":"127.0.0.1", "port":5556, "username":"user1",
    "password":"secret"}
}

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

app.set('view engine', 'ejs');

// serve the files out of ./public as our main files
//app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public')


var client = redis.createClient(credentials.port, credentials.host);
if (credentials.password != '') {
    client.auth(credentials.password);
}
client.on("error", function (err) {
        console.log("Error " + err);
});




// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

//var connString = "DRIVER={DB2};DATABASE=SQLDB;HOSTNAME=75.126.155.153;UID=user04848;PWD=hjC8gSiSTzR1;PORT=50000;PROTOCOL=TCPIP";
//connect to the database
//ibmdb = require('ibm_db');
//app.locals.ibmdb = ibmdb;
	/*ibmdb.open(connString, function (err,conn) {
	if (err) console.log(err);
	//collect the collaborations from the database
	var query = "insert into images (collaboration, position) values (4, 12);";
	var rows = conn.querySync(query);
		conn.close(function() {
			console.log(rows);
		});
});*/


	/*ibmdb.open(connString, function (err,conn) {
	if (err) console.log(err);
	//collect the collaborations from the database
	var query = "select collaboration, position, picture from Images ORDER BY collaboration, position";
	var rows = conn.querySync(query);
	console.log(rows);
		conn.close(function() {
			console.log('done');
		});

});*/

var name = "didn't break?"

app.get('/', function(request, response) {
  response.render('index', {name: name});
  //response.send("whyy")	
  client.incrby("number", 1, function (err, num) {
        res.render('index', {name: name, number: num}); 
    });

});

app.get('/dummy', function(request, response) {
  response.render('dummy', {name: name});
  //response.send("whyy")
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening

  console.log("server starting on " + appEnv.url);
});




