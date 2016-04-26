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

// Get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// Provides http requests
var request = require('request');

// Provides access to SQL database
var ibmdb = require('ibm_db');

// Parses request body
var bodyParser = require('body-parser');

// Create a new express server
var app = express();
app.use(bodyParser.json());
// Serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

//database connections
var connString = "DRIVER={DB2};DATABASE=SQLDB;HOSTNAME=75.126.155.153;UID=user04848;PWD=hjC8gSiSTzR1;PORT=50000;PROTOCOL=TCPIP";

app.post('/save', function(req, res) {
	ibmdb.open(connString, function(err, conn) {
		if (err) {
			res.json({ success: false });
		}
		else {
			var queryStringInsert = "INSERT INTO IMAGES (collaboration, position) VALUES ('" +
												req.body.collab + "', '" + req.body.pos + "')";

			conn.query(queryStringInsert, function(err, rows, moreResultSets) {
				if (err) {
					res.json({ success: false });
				}
				else {
					//var queryString = "SELECT Username, Score FROM Highscores ORDER BY Score DESC LIMIT 5";
					var queryStringSelect = "SELECT collaboration, position FROM IMAGES ORDER BY collaboration DESC FETCH FIRST 5 ROWS ONLY";

					conn.query(queryStringSelect, function(err, rows, moreResultSets) {
						if (err) {
							res.json({ success: false });
						}
						else {
							conn.close(function() {
								console.log(rows);
								res.json({ data: rows, success: true });
							});
						}
					});
				}
			});
		}
	});
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});




