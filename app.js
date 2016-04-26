/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
/*globals ibmdb:true */
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

//app.set('view engine', 'ejs');

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
//app.set('views', __dirname + '/public')






// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var connString = "DRIVER={DB2};DATABASE=SQLDB;HOSTNAME=75.126.155.153;UID=user04848;PWD=hjC8gSiSTzR1;PORT=50000;PROTOCOL=TCPIP";
//connect to the database
ibmdb = require('ibm_db');
	ibmdb.open(connString, function (err,conn) {
	if (err) console.log(err);
	//collect the collaborations from the database
	var query = "insert into images (collaboration, position) values (1, 11);";
	var rows = conn.querySync(query);
		conn.close(function() {
			console.log(rows);
		});
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

/*app.get('/', function(request, response) {
  response.render('index', {name: name, ibmdb: ibmdb});
  //response.send("whyy")
});


app.get('/dummy', function(request, response) {
  response.render('dummy', {name: name});
  //response.send("whyy")
});
*/
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening

  console.log("server starting on " + appEnv.url);
});




