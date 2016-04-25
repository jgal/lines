/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

//connect to the database
var ibmdb = require('ibm_db');
	ibmdb.open("DRIVER={DB2};DATABASE=SQLDB;HOSTNAME=75.126.155.153;UID=user04848;PWD=hjC8gSiSTzR1;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
	if (err) console.log(err);
	//collect the collaborations from the database
	var query = "select collaboration, position, picture from Images ORDER BY collaboration, position";
	var rows = conn.querySync(query);
	console.log(rows);
		conn.close(function() {
			console.log('done');
		});

});


//parse the results of the query

//count users
var userCount = 0;
var userbytwo = 0; /* added var definition for userbytwo here */
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
	  console.log("userCount: " + userCount);
app.get('/', function(req, res){
  userCount = userCount + 1;
  /* add statement to increment userbytwo by two here */
  userbytwo = userbytwo + 2;
  res.render('index', {userCount: userCount, userbytwo: userbytwo});
 /* updated this line */
});
  console.log("server starting on " + appEnv.url);

  
});



