exports.insert = function(ibmdb,connString) {
    return function(req, res) {
		var collab = req.body.collab;
		var pos = req.body.pos;
		var url = req.body.url;
	   	   
       ibmdb.open(connString, function(err, conn) {
			if (err ) {
			 res.send("error occurred " + err.message);
			}
			else {
				conn.query("insert into images (collaboration, position, picture) values(" + collab +", " +pos+", " + url + ");", function(err, tables, moreResultSets) {
							
							
				if ( !err ) {
				
					res.send("successfull");

					
				} else {
				   res.send("error occurred " + err.message);
				}

				/*
					Close the connection to the database
					param 1: The callback function to execute on completion of close function.
				*/
				conn.close(function(){
					console.log("Connection Closed");
					});
				});
			}
		} );
	   
	}
	}