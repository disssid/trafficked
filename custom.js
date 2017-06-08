$(function () {
	var location, mapCanvas, map, dsMap,heatmaparr=[],detmarkers=[],crashmarkers=[], traffic= [],weather =[];
	var crashdata;
	var crashmarkers,detmarkers;

	function initMap() {
		//var lt, ln=0.00; use by getting latllong from the db

		centerloc = new google.maps.LatLng(39.125212,-94.551136); //latlong for the map to recenter somewhere in wichita
		locations = [['Kansas City', 39.125212,-94.551136]];

		mapCanvas = document.getElementById('map');
		var mapOptions = {
				center: centerloc,
				zoom: 9,
				panControl: true,
				scrollwheel: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		map = new google.maps.Map(mapCanvas, mapOptions);
		addMarker(locations,1);
		alert("Welcome to Kansas City Traffic Data Visualization")
		try{
			$.post('./CrashSite.php',function(result){
				try{
					crashdata= JSON.parse(result);
					console.log(crashdata);
				}
				catch(err){
					alert("Uh-Oh!!!!!!!!! Something's wrong retry and wait for 5 secs for connecction to be established")
				}
			});
		}
		catch(err){
			alert("Uh-Oh!!!!!!!!! Something's wrong retry and wait for 5 secs for connecction to be established");      
		}
		plotDetector();
		toggleDetector();
	}
	window.plotHeatMap=function(){
		try{
			for (i = 0; i < crashdata.length; i++)
			{
				heatmaparr.push(new google.maps.LatLng(crashdata[i][1], crashdata[i][2]))
			}
			heatmap = new google.maps.visualization.HeatmapLayer({
				data: heatmaparr,
				map: map,
				radius : 20
			});
		}
		catch(err){
			alert("Uh-Oh!!!!!!!!! Something's wrong retry and wait for 5 secs for connecction to be estableshed")
		}
	}


	var traffic,weather,crashes;
	//Call detectorStations.php to fetch the detector stations and plot them on the map
	window.plotDetector=function() {
		try{
			$.post('./detectorStations.php',function(result){
				//console.log(result)
				try{
					traffic= JSON.parse(result)
					addMarker(traffic,1)
					dsMap = map.data.getMap()
				}
				catch(err){
					alert("Uh-Oh!!!!!!!!! Something's wrong retry and wait for 5 secs for connecction to be estableshed")
				}
			});
		}
		catch(err){
			alert("Uh-Oh!!!!!!!!! Something's wrong retry and wait for 5 secs for connecction to be estableshed") }
	}
	//Call crashSite.php to fetch the crash site and plot them on the map
	window.plotCrashes= function(){  addMarker(crashdata,2);}
	
	Math.radians = function(degrees) {
		  return degrees * Math.PI / 180;
		};
		 
		// Converts from radians to degrees.
		Math.degrees = function(radians) {
		  return radians * 180 / Math.PI;
		};
	
	window.plotWeather = function(loc,dat,lat,long,callback){
		var prevCalc = 10;
		var intid = 7289;

		var R = 6371; // Radius of the earth in km
		var crashLat = Math.radians(lat);
	  	var crashLong = Math.radians(long);
	  	traffic.forEach(function(valu){
		  	//var result =  	
		  	var	radLat = Math.radians(valu[1]);
		  	var	radLong = Math.radians(valu[2]);
		  	var calc = Math.acos(Math.sin(crashLat) * Math.sin(radLat) + Math.cos(crashLat) * Math.cos(radLat) * Math.cos(radLong - (crashLong))) * R;
		  	if(calc < 10 && calc < prevCalc){
		  		prevCalc = calc;
		  		intid = valu[4];
		  	}
	  	});
	  	
		 
		try{
			$.post('./WeatherData.php',{paratime: dat},function(result){
				//console.log(result)
				try{
					weather= JSON.parse(result)

					//addMarker(data,2)
					//plotHeatMap(crashes)
					//callback(weather);
				}
				catch(err){
					alert("Uh-Oh!!!!!!!!! Something's wrong retry and wait for 5 secs for connecction to be estableshed")
				}
			});
		}
		catch(err){
			alert("Uh-Oh!!!!!!!!! Something's wrong retry and wait for 5 secs for connecction to be estableshed")
		}

		try{
			$.post('./trafficData.php',{paradata: intid,timedata: dat},function(result){
				//console.log(result)
				try{
					trafficdata= JSON.parse(result)
					//console.log("trafficdata : " + trafficdata);
					//addMarker(data,2)
					//plotHeatMap(crashes)
					var johnson = weather[0].concat(trafficdata[0]);
					console.log("This is Johnson : " +johnson);
					callback(johnson);
				}
				catch(err){
					alert("Uh-Oh!!!!!!!!! Something's wrong retry and wait for 5 secs for connecction to be estableshed")
				}
			});
		}
		catch(err){
			alert("Uh-Oh!!!!!!!!! Something's wrong retry and wait for 5 secs for connecction to be estableshed")
		}
		//callback(trafficdata);
	}


	window.toggleHeatMap=function(){
		heatmap.setMap(heatmap.getMap()? null: map)
	}
	window.toggleDetector=function(){setMapOnAll(null,1);}
	window.toggleCrashes = function(){setMapOnAll(null,2);}

//	Removes the markers from the map, but keeps them in the array.
	function clearMarkers() {
		setMapOnAll(null);
	}

	function showMarkers() {
		setMapOnAll(map);
	}
	// Sets the map on all markers in the array.
	function setMapOnAll(map,type) {
		if(type ==1)
			markers = detmarkers;
		else
			markers = crashmarkers;
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
	}

	function addMarker(location,type){  //function to add a list of markers with db query

		//if type = 1(detector station - marker-blue.png) type = 2(crash site - marker-red.png)
		heatmaparr = []
		if(type == 1)
			var markerImage = 'media/marker-blue1.png';
		else
			var markerImage = 'media/marker-red1.png';
		var marker,i;

		try{
			for (i = 0; i < location.length; i++)
			{
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(location[i][1], location[i][2]),
					map: map,
					icon: markerImage
				});
				//heatmaparr.push(new google.maps.LatLng(location[i][1], location[i][2]))
				if(type == 1)
					detmarkers.push(marker)
				else{
					crashmarkers.push(marker)
					
					google.maps.event.addListener(marker, 'click', (function(marker, i) {
						return function() {
							var ms=location[i][3].$date.$numberLong;

							var d=new Date(+ms);
							var dat=d.toUTCString();

							infowindow.setContent(location[i][0] + " " +dat);
							infowindow.open(map, marker);
							//trafficTable(location[i][0],ms);
							weatherTable(location[i][0],ms,location[i][1],location[i][2]);


						}
					})(marker, i));}

				var contentString = '';

				var infowindow = new google.maps.InfoWindow({
					content: contentString,
					maxWidth: 400
				});

			}}
		catch(err){
			alert("Uh-Oh!!!!!!!!! Something's wrong retry and wait for 5 secs for connecction to be estableshed");
		}
	}

	google.maps.event.addDomListener(window, 'load', initMap);
});

