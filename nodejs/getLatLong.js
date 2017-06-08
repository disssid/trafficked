#!/usr/bin/env nodejs

function getLatLong(){

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
					findStationLocation(
								db,function () 
								{
								db.close();
								}
							    );
					});

//************************************************************************
//has 10 limit result, should remove limit(10) when doing the final query)
//***********************************************************************
var findStationLocation = function(db,callback){
       db.collection("aggiecopy").aggregate([
	  {
		$lookup:
		{
			from: "detectorstation",
			localField: "DSIntId",
			foreignField: "IntId",
			as: "traffic_stn_loc"
		}
	  },
	  {
		$project:
		{
			_id:0,
			DSIntId : 1,
			"traffic_stn_loc": 
			{
				IntId: 1,
				Name: 1,
				Latitude: 1,
				Longitude: 1
			}
		}
	}
]).limit(10)
				      .toArray(function(err,result){
								    assert.equal(err,null);
					    			    console.log(result);
								    callback(result);
								   }
					     );


};

}

getLatLong();


