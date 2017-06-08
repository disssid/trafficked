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
MongoClient
	.connect(url,function(err,db){
    if(err) return console.log(err);
    else{
			console.log("Connected Successfully");
			findDetectorStations(db,function () {
				db.close();
		})
			}})
}

var findDetectorStations = function(db,callback){
	console.log("Find detector stations")
	var cursor = db.collection('detectorstation').find();
	cursor.each(function(err,doc){
		//console.log(doc);
		if(doc != null)
			console.log(doc);
		else
			callback();
	})
}


plotDetectorStation();
