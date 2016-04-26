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

var collab = 0;

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
	console.log("Request made to save an image");
	ibmdb.open(connString, function(err, conn) {
		if (err) {
			console.log("error there");
			res.json({ success: false });
		}
		else {
			//if this is the first postion, then it is a new collaboration
			var queryStringInsert = "INSERT INTO IMAGE (collaboration, position, picture) VALUES ('" +
												1 + "', '" + req.body.pos + "', '" + req.body.pic + "');";
			if (collab === 0) {
				if (req.body.pos === 9) {
					collab = 1;
				}
			}
			else {
				queryStringInsert = "UPDATE IMAGE SET picture='" + req.body.pic + "' WHERE collaboration=1 AND position=" + req.body.pos + ";";
			}
			//console.log(queryStringInsert);
			conn.query(queryStringInsert, function(err, rows, moreResultSets) {
				if (err) {
					res.json({ success: false });
				}
				else {
					//var queryString = "SELECT Username, Score FROM Highscores ORDER BY Score DESC LIMIT 5";
					var queryStringSelect = "SELECT picture FROM IMAGE WHERE collaboration=1 ORDER BY position;";
					console.log(queryStringSelect);
					conn.query(queryStringSelect, function(err, rows, moreResultSets) {
						if (err) {
							console.log("error here");
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




