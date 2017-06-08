window.trafficTable=function(loc,dat) {
	console.log(loc + " "+dat);
	var myTableDiv = document.getElementById("traffictable")
	var table = document.createElement('TABLE')
	var tableBody = document.createElement('TBODY')
	var stock = new Array()
	table.border = '1'
	table.appendChild(tableBody);

	var heading = new Array();
	heading[0] = "DSIntId"
	heading[1] = "Station Volume"
	heading[2] = "Station Count"
	heading[3] = "Station Speed"
	heading[4] = "Station Occupancy"

	stock.push(new Array(loc,dat))

	//TABLE COLUMNS
	var tr = document.createElement('TR');
	tableBody.appendChild(tr);
	for (i = 0; i < heading.length; i++) {
		var th = document.createElement('TH')
		th.width = '75';
		th.appendChild(document.createTextNode(heading[i]));
		tr.appendChild(th);
	}
	//TABLE ROWS
	for (i = 0; i < stock.length; i++) {
		var tr = document.createElement('TR');
		for (j = 0; j < stock[i].length; j++) {
			var td = document.createElement('TD')
			td.appendChild(document.createTextNode(stock[i][j]));
			tr.appendChild(td)
		}
		tableBody.appendChild(tr);
	}
	myTableDiv.appendChild(table)
}

window.weatherTable=function(loc,ms,lat,long) {

	var myTableDiv = document.getElementById("weathertable")
	//myTableDiv.innerHTML = "";
	if(document.getElementById('weatherTable') == null)
	{
		var table = document.createElement('TABLE')
		var tableBody = document.createElement('TBODY')

		table.border = '1';
		table.align = 'center'
		table.id = 'weatherTable';
		tableBody.id = 'weatherTableBody';
		table.appendChild(tableBody);

		var heading = new Array();
		heading[0] = "Crash Time";
		heading[1] = "Crash Location";
		heading[2] = "Wind Direction";
		heading[3] =  "Wind Speed";
		heading[4] = "Wind Gust";
		heading[5] = "Temperature";
		heading[6] = "Snow Depth";
		heading[7] = "DSIntId"
	    heading[8] = "Station Volume"
	    heading[9] = "Station Count"
	    heading[10] = "Station Speed"
	    heading[11] = "Station Occupancy"

		//TABLE COLUMNS
		var tr = document.createElement('TR');
		tableBody.appendChild(tr);
		for (i = 0; i < heading.length; i++) {
			var th = document.createElement('TH')
			th.width = '75';
			th.appendChild(document.createTextNode(heading[i]));
			tr.appendChild(th);
		}
	}
	else{
		var table = document.getElementById('weatherTable')
		var tableBody = document.getElementById('weatherTableBody')
	    }

	var stock = new Array()

	plotWeather(loc,ms,lat,long,function(weather){
		console.log(ms);
		var d=new Date(+ms);
		var dat=d.toUTCString();
		stock.push(weather);
		console.log(stock);
		//TABLE ROWS
		for (i = 0; i < stock.length; i++) {
			var tr = document.createElement('TR');
			var td = document.createElement('TD')
			td.appendChild(document.createTextNode(dat));
			tr.appendChild(td)
			var td = document.createElement('TD')
			td.appendChild(document.createTextNode(loc));
			tr.appendChild(td)
			for (j = 0; j < stock[i].length; j++) {
				var td = document.createElement('TD')
				td.appendChild(document.createTextNode(stock[i][j]));
				tr.appendChild(td)
			}
			tableBody.appendChild(tr);
		}
		myTableDiv.appendChild(table)
	});
}