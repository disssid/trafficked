var crashLat  =  38.96009;
var crashLong = -94.9584;
var radius = 10;
var loc = [];

//calling the function
crashStations(crashLat,crashLong,radius);

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// checks detector stations near a crashsite within a radius
function crashStations(crashLat,crashLong, radius){

  	var R = 6371; // Radius of the earth in km
  	var crashLat = Math.radians(crashLat);
  	var crashLong = Math.radians(crashLong);
  	var result = db.detectorstation.find();
	print(R);
    result.forEach(
  				function(doc){
  				  	radLat = Math.radians(doc.Latitude)
  				  	radLong = Math.radians(doc.Longitude)
  				  	var calc = Math.acos(Math.sin(crashLat) * Math.sin(radLat) + Math.cos(crashLat) * Math.cos(radLat) * Math.cos(radLong - (crashLong))) * R;
  				  	//print("Calc :" + calc);
  					if(calc <= radius)
  					{
			  			loc.push(
  							{
  				  				latitude: doc.Latitude,
								longitude: doc.Longitude
  							}
  						);
  					}
  				}
  				)
  	display();
}

function display(){
loc.forEach(
	function(val){
		print("Latitude : " + val.latitude + " Longitude : " + val.longitude);
	}
)
}