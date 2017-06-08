#!/usr/bin/env nodejs

function plotDetectorStation(){

// Define connection parameters
var MongoClient = require('mongodb').MongoClient,
Db = require('mongodb').Db,
assert = require('assert'),
f = require('util').format;
var user = encodeURIComponent('');
var password = encodeURIComponent('');
var authMechanism = 'DEFAULT';

// Encode the connection parameters into a url string
var url = f('mongodb://%s:%s@localhost:27017/traffic?authMechanism=%s',user,password,authMechanism);


// Connect to the db
MongoClient.connect(url,function(err,db){
    					assert.equal(null,err);
					findDetectorStations(
								db,function () 
								{
									assert.equal(null,err);
								db.close();
								}
							    );
					assert.equal(null,err);
					});


var findDetectorStations = function(db,callback){
       db.collection('detectorstation').aggregate([
						   {	
						    $project:
						            {
						    	     _id:0,
					          	     Name:1,
							     Longitude:1,
							     Latitude:1
							    }
						   }
						   ])
				      .toArray(function(err,result){
								    assert.equal(err,null);
					    			    console.log(result);
								    callback(result);
								   }
					     );


};

}






