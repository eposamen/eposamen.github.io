
var req;
var myLat = 0;
var myLng = 0;
var allStations;
var allDistances;
var jsonSched;
var me = new google.maps.LatLng(myLat, myLng);
var panLat = 42.3581;
var panLng = -71.0636;
var panToMark = new google.maps.LatLng(panLat, panLng);
var myOptions = {
			zoom: 15, 
			center: panToMark,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
var map;
var marker;
var places;
var meMarker;
var bluetxt = '[{"station":"Wonderland","lat":42.41342,"lng":-70.991648},{"station":"Revere Beach","lat":42.40784254,"lng":-70.99253321},{"station":"Beachmont","lat":42.39754234,"lng":-70.99231944},{"station":"Suffolk Downs","lat":42.39050067,"lng":-70.99712259},{"station":"Orient Heights","lat":42.386867,"lng":-71.00473599999999},{"station":"Wood Island","lat":42.3796403,"lng":-71.02286539000001},{"station":"Airport","lat":42.374262,"lng":-71.030395},{"station":"Maverick","lat":42.36911856,"lng":-71.03952958000001},{"station":"Aquarium","lat":42.359784,"lng":-71.051652},{"station":"State Street","lat":42.358978,"lng":-71.057598},{"station":"Government Center","lat":42.359705,"lng":-71.05921499999999},{"station":"Bowdoin","lat":42.361365,"lng":-71.062037}]';
var orangetxt = '[{"station":"Oak Grove","lat":42.43668,"lng":-71.07109699999999},{"station":"Malden Center","lat":42.426632,"lng":-71.07411},{"station":"Wellington","lat":42.40237,"lng":-71.077082},{"station":"Sullivan","lat":42.383975,"lng":-71.076994},{"station":"Community College","lat":42.373622,"lng":-71.06953300000001},{"station":"North Station","lat":42.365577,"lng":-71.06129},{"station":"Haymarket","lat":42.363021,"lng":-71.05829},{"station":"State Street","lat":42.358978,"lng":-71.057598},{"station":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"station":"Chinatown","lat":42.352547,"lng":-71.062752},{"station":"Tufts Medical","lat":42.349662,"lng":-71.063917},{"station":"Back Bay","lat":42.34735,"lng":-71.075727},{"station":"Mass Ave","lat":42.341512,"lng":-71.083423},{"station":"Ruggles","lat":42.336377,"lng":-71.088961},{"station":"Roxbury Crossing","lat":42.331397,"lng":-71.095451},{"station":"Jackson Square","lat":42.323132,"lng":-71.099592},{"station":"Stony Brook","lat":42.317062,"lng":-71.104248},{"station":"Green Street","lat":42.310525,"lng":-71.10741400000001},{"station":"Forest Hills","lat":42.300523,"lng":-71.113686}]';
var redtxt = '[{"station":"Alewife","lat":42.395428,"lng":-71.142483},{"station":"Davis","lat":42.39674,"lng":-71.121815},{"station":"Porter Square","lat":42.3884,"lng":-71.11914899999999},{"station":"Harvard Square","lat":42.373362,"lng":-71.118956},{"station":"Central Square","lat":42.365486,"lng":-71.103802},{"station":"Kendall/MIT","lat":42.36249079,"lng":-71.08617653},{"station":"Charles/MGH","lat":42.361166,"lng":-71.070628},{"station":"Park Street","lat":42.35639457,"lng":-71.0624242},{"station":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"station":"South Station","lat":42.352271,"lng":-71.05524200000001},{"station":"Broadway","lat":42.342622,"lng":-71.056967},{"station":"Andrew","lat":42.330154,"lng":-71.057655},{"station":"JFK/UMass","lat":42.320685,"lng":-71.052391},{"station":"North Quincy","lat":42.275275,"lng":-71.029583},{"station":"Wollaston","lat":42.2665139,"lng":-71.0203369},{"station":"Quincy Center","lat":42.251809,"lng":-71.005409},{"station":"Quincy Adams","lat":42.233391,"lng":-71.007153},{"station":"Braintree","lat":42.2078543,"lng":-71.0011385},{"station":"Savin Hill","lat":42.31129,"lng":-71.053331},{"station":"Fields Corner","lat":42.300093,"lng":-71.061667},{"station":"Shawmut","lat":42.29312583,"lng":-71.06573796000001},{"station":"Ashmont","lat":42.284652,"lng":-71.06448899999999}]';
//var blueNumStations = 12;
//var blueInfo = JSON.parse('["color":"#0000FF", "numStops:":12, "icon":"markerblue.png"]');
var blueInfo = '["color":"#0000FF", "numStops:":12, "icon":"markerblue.png"]';
//var orangeNumStations = 19;
var orangeInfo = '["color":"#ff9c00", "numStops:":19, "icon":"markerorange.png"]';
//var redNumStations = 22;
var redInfo = '["color":"#FF0000", "numStops:":22, "icon":"markerred.png"]';
function init() {
		req = new XMLHttpRequest();
		req.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
		req.onreadystatechange = dataReady;
		req.send(null);
}

function dataReady() {
	if (req.readyState == 4 && req.status == 200) {
		jsonSched = JSON.parse(req.responseText);
		nextStep();
	}
	else if (req.readyState == 4 && req.status == 500) {
			scheduleDom = document.getElementById("map_canvas");
			error();
	}
}

function error()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	if (navigator.geolocation) { 
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			me = new google.maps.LatLng(myLat, myLng);
			map.panTo(me);

			var meMarker = new google.maps.Marker({
				position: me,
				title: "MTBA Information is not available, sorry!"
			});

			meMarker.setMap(map);
			var errorWindow = new google.maps.InfoWindow();
			errorWindow.setContent(meMarker.title);
			errorWindow.open(map, meMarker);
			errorWindow.show
			google.maps.event.addListener(meMarker, 'onLoad', function() {
				errorWindow.setContent(meMarker.title);
				errorWindow.open(map, meMarker);
			});		
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}

}


function nextStep()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();

}

function getMyLocation()
{
	if (navigator.geolocation) { 
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap() {

	me = new google.maps.LatLng(myLat, myLng);
	//map.panTo(me);
	panToMark = new google.maps.LatLng(42.41342, -70.991648);
	map.panTo(panToMark);

	//var meMarker = new google.maps.Marker({
	meMarker = new google.maps.Marker({
		position: me,
		title: "You are here"
	});

	meMarker.setMap(map);

	if (jsonSched["line"] == "blue") {
		var jsonInfo = JSON.parse(blueInfo);
		createPath(blueInfo, bluetxt);
	}

	else if (jsonSched["line"] == "orange") {
		var jsonInfo = JSON.parse(orangeInfo);
		createPath(orangeInfo, orangetxt);
	}
	else if (jsonSched["line"] == "red") {
		var redtxt = '[{"station":"Alewife","lat":42.395428,"lng":-71.142483},{"station":"Davis","lat":42.39674,"lng":-71.121815},{"station":"Porter Square","lat":42.3884,"lng":-71.11914899999999},{"station":"Harvard Square","lat":42.373362,"lng":-71.118956},{"station":"Central Square","lat":42.365486,"lng":-71.103802},{"station":"Kendall/MIT","lat":42.36249079,"lng":-71.08617653},{"station":"Charles/MGH","lat":42.361166,"lng":-71.070628},{"station":"Park Street","lat":42.35639457,"lng":-71.0624242},{"station":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"station":"South Station","lat":42.352271,"lng":-71.05524200000001},{"station":"Broadway","lat":42.342622,"lng":-71.056967},{"station":"Andrew","lat":42.330154,"lng":-71.057655},{"station":"JFK/UMass","lat":42.320685,"lng":-71.052391},{"station":"North Quincy","lat":42.275275,"lng":-71.029583},{"station":"Wollaston","lat":42.2665139,"lng":-71.0203369},{"station":"Quincy Center","lat":42.251809,"lng":-71.005409},{"station":"Quincy Adams","lat":42.233391,"lng":-71.007153},{"station":"Braintree","lat":42.2078543,"lng":-71.0011385},{"station":"Savin Hill","lat":42.31129,"lng":-71.053331},{"station":"Fields Corner","lat":42.300093,"lng":-71.061667},{"station":"Shawmut","lat":42.29312583,"lng":-71.06573796000001},{"station":"Ashmont","lat":42.284652,"lng":-71.06448899999999}]';

		var jsonRed= JSON.parse(redtxt);
		var redLineStops1 = [];
		var redLineStops2 = [];
		for (var i = 0; i < 22; i++) {
			var newLat = jsonRed[i]["lat"];
			var newLng = jsonRed[i]["lng"];
			var latlng = new google.maps.LatLng(newLat, newLng);
			if (i == 12) {
				redLineStops2.push(latlng);
			}
			if (i < 18) {
				redLineStops1.push(latlng);
			}
			else {
				redLineStops2.push(latlng);
			}

			var stopMarker = new google.maps.Marker({
				position: latlng,
				map:map,
				title: jsonRed[i]["station"],
				icon: "markerred.png",
			});
			
			stopMarker.setMap(map);

			var infowindow = new google.maps.InfoWindow();  
			google.maps.event.addListener(stopMarker, 'click', (function(stopMarker) {  
				return function() {  
					var content = writeStationInfo(stopMarker.title);
					infowindow.setContent(content);  
					infowindow.open(map, stopMarker);  
				}  
			})(stopMarker));
		}

		var redPath1 = new google.maps.Polyline({
			path: redLineStops1,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 2
		}); 
		redPath1.setMap(map);

		var redPath2 = new google.maps.Polyline({
			path: redLineStops2,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 2
		}); 
		redPath2.setMap(map);
	}
	
/*
	if (jsonSched["line"] == "blue") {
		var bluetxt = '[{"station":"Wonderland","lat":42.41342,"lng":-70.991648},{"station":"Revere Beach","lat":42.40784254,"lng":-70.99253321},{"station":"Beachmont","lat":42.39754234,"lng":-70.99231944},{"station":"Suffolk Downs","lat":42.39050067,"lng":-70.99712259},{"station":"Orient Heights","lat":42.386867,"lng":-71.00473599999999},{"station":"Wood Island","lat":42.3796403,"lng":-71.02286539000001},{"station":"Airport","lat":42.374262,"lng":-71.030395},{"station":"Maverick","lat":42.36911856,"lng":-71.03952958000001},{"station":"Aquarium","lat":42.359784,"lng":-71.051652},{"station":"State Street","lat":42.358978,"lng":-71.057598},{"station":"Government Center","lat":42.359705,"lng":-71.05921499999999},{"station":"Bowdoin","lat":42.361365,"lng":-71.062037}]';
		var jsonBlue = JSON.parse(bluetxt);
		var blueLineStops = [];
		for (i = 0; i < 12; i++) {
			var newLat = jsonBlue[i]["lat"];
			var newLng = jsonBlue[i]["lng"];
			var latlng = new google.maps.LatLng(newLat, newLng);
			blueLineStops.push(latlng);
			var stopMarker = new google.maps.Marker({
				position: latlng,
				map:map,
				title: jsonBlue[i]["station"],
				icon: "markerblue.png"
			});
			
			stopMarker.setMap(map);
			
			var infowindow = new google.maps.InfoWindow();  
			google.maps.event.addListener(stopMarker, 'click', (function(stopMarker) {  
				return function() {  
					var content = writeStationInfo(stopMarker.title);
					infowindow.setContent(content);  
					infowindow.open(map, stopMarker);  
				}
			})(stopMarker));

		}
		var bluePath = new google.maps.Polyline({
			 path: blueLineStops,
			strokeColor: '#0000FF',
			strokeOpacity: 1.0,
			strokeWeight: 2
		}); 
		bluePath.setMap(map);
		
	}


	


///////////////////////////////// ORANGE /////////////////////////////////
	else if (jsonSched["line"] == "orange") {
		var orangetxt = '[{"station":"Oak Grove","lat":42.43668,"lng":-71.07109699999999},{"station":"Malden Center","lat":42.426632,"lng":-71.07411},{"station":"Wellington","lat":42.40237,"lng":-71.077082},{"station":"Sullivan","lat":42.383975,"lng":-71.076994},{"station":"Community College","lat":42.373622,"lng":-71.06953300000001},{"station":"North Station","lat":42.365577,"lng":-71.06129},{"station":"Haymarket","lat":42.363021,"lng":-71.05829},{"station":"State Street","lat":42.358978,"lng":-71.057598},{"station":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"station":"Chinatown","lat":42.352547,"lng":-71.062752},{"station":"Tufts Medical","lat":42.349662,"lng":-71.063917},{"station":"Back Bay","lat":42.34735,"lng":-71.075727},{"station":"Mass Ave","lat":42.341512,"lng":-71.083423},{"station":"Ruggles","lat":42.336377,"lng":-71.088961},{"station":"Roxbury Crossing","lat":42.331397,"lng":-71.095451},{"station":"Jackson Square","lat":42.323132,"lng":-71.099592},{"station":"Stony Brook","lat":42.317062,"lng":-71.104248},{"station":"Green Street","lat":42.310525,"lng":-71.10741400000001},{"station":"Forest Hills","lat":42.300523,"lng":-71.113686}]';

		var jsonOrange = JSON.parse(orangetxt);
		var orangeLineStops = [];
		for (var i = 0; i < 19; i++) {
			var newLat = jsonOrange[i]["lat"];
			var newLng = jsonOrange[i]["lng"];
			var latlng = new google.maps.LatLng(newLat, newLng);
			orangeLineStops.push(latlng);
			var stopMarker = new google.maps.Marker({
				position: latlng,
				map:map,
				title: jsonOrange[i]["station"],
				icon: "markerorange.png"

			});
			
			stopMarker.setMap(map);
			
			var infowindow = new google.maps.InfoWindow();  
			google.maps.event.addListener(stopMarker, 'click', (function(stopMarker) {  
				return function() {  
					var content = writeStationInfo(stopMarker.title);
					infowindow.setContent(content);  
					infowindow.open(map, stopMarker);  
				}  
			})(stopMarker));
		}

		var orangePath = new google.maps.Polyline({
			 path: orangeLineStops,
			strokeColor: '#ff9c00',
			strokeOpacity: 1.0,
			strokeWeight: 2
		}); 
		orangePath.setMap(map);
	}
	*/
/////////////////////////////////// RED ///////////////////////////////////





	google.maps.event.addListener(meMarker, 'click', function() {
		if (jsonSched["line"] == "blue") {

			var content = writeMeInfo(meMarker, jsonInfo);
		}
		else if (jsonSched["line"] == "red") {
			var content = writeMeInfo(meMarker, jsonInfo);
		}

		else if (jsonSched["line"] == "orange") {
			var content = writeMeInfo(meMarker, jsonInfo);
		}
		infowindow.setContent(content);
		infowindow.open(map, meMarker);
	});
}

function writeMeInfo(meMarker, json)
{
	var min = haversine(meMarker, json[0]);

	var stationDistanc;
	var minName = json[0]["station"];
	for (i = 0; i < json.length; i++) {
		stationDistance = haversine(meMarker, json[i]);
		if (stationDistance <= min) {
			min = stationDistance;
			minName = json[i]["station"];
		}
	}

	var table = document.createElement("table");
	var headerRow = document.createElement("tr");
	var headerData = document.createElement("td");
	headerData.id = "bold";
	var header = document.createTextNode("You are here");
	headerData.appendChild(header);
	headerRow.appendChild(headerData);

	var row1 = document.createElement("tr");
	var lineTitle = document.createElement("td");
	var lineWord = document.createTextNode(meMarker.title);
	lineTitle.appendChild(lineWord);

	var row2 = document.createElement("tr");
	var row2data1 = document.createElement("td");
	var row2Text1 = document.createTextNode("Closest " + jsonSched["line"] + " station:");
	row2data1.appendChild(row2Text1);
	row2.appendChild(row2data1);

	var row2data2 = document.createElement("td");
	var row2Text2 = document.createTextNode(minName);
	row2data2.appendChild(row2Text2);
	row2.appendChild(row2data2);


	var row3 = document.createElement("tr");
	var row3data1 = document.createElement("td");
	var row3Text1 = document.createTextNode("Distance:");
	row3data1.appendChild(row3Text1);
	row3.appendChild(row3data1);

	var row3data2 = document.createElement("td");
	var row3Text2 = document.createTextNode(min + "km");
	row3data2.appendChild(row3Text2);
	row3.appendChild(row3data2);
	table.appendChild(headerRow);
	table.appendChild(row1);
	table.appendChild(row2);
	table.appendChild(row3);

	return table;

}

function haversine(meMarker, pos)
{
	var lat2 = pos["lat"];	
	var lng2 = pos["lng"];
	var R = 6371; 
	var mult = Math.PI / 180;
	var xLat = (lat2 - myLat);
	var dLat = (xLat * mult);
	var xLng = (lng2 - myLng);
	var dLon = (xLng * mult);
	var lat1 = myLat * mult;
	var lat2 = lat2 * mult;

	var a = (Math.sin(dLat/2) * Math.sin(dLat/2) +
		        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)); 

	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	
	var d = R * c;
	return d;
}

function writeStationInfo(station)
{
	var table = document.createElement("table");
	
	var titleRow = document.createElement("tr");

	var titleData = document.createElement("td");
	titleData.id = "bold";
	var titleWord = document.createTextNode(station);
	titleData.appendChild(titleWord);
	titleRow.appendChild(titleData);

	var tableRow = document.createElement("tr");
	
	var lineTitle = document.createElement("td");
	lineTitle.id = "categories";
	var lineWord = document.createTextNode("Line");
	lineTitle.appendChild(lineWord);


	var tripTitle = document.createElement("td");
	var tripWord = document.createTextNode("Trip #");
	tripTitle.id = "categories";
	tripTitle.appendChild(tripWord);

	var directionTitle = document.createElement("td");
	var directionWord = document.createTextNode("Direction");
	directionTitle.id = "categories";
	directionTitle.appendChild(directionWord);

	var timeTitle = document.createElement("td");
	var timeWord = document.createTextNode("Time Remaining");
	timeTitle.id = "categories";
	timeTitle.appendChild(timeWord);

	tableRow.appendChild(lineTitle);
	tableRow.appendChild(tripTitle);
	tableRow.appendChild(directionTitle);
	tableRow.appendChild(timeTitle);
	table.appendChild(titleRow);
	table.appendChild(tableRow);

	
	for (var iter1 in jsonSched["schedule"]) {
		var info1 = jsonSched["schedule"][iter1];
		for (var iter2 in info1["Predictions"]) {
			var info2 = info1["Predictions"][iter2];
			if (info2["Stop"] == station) {
				var infoTableRow = document.createElement("tr");
				var infoLineTitle = document.createElement("td");
				infoLineTitle.id = "station";
				var infoLineWord = document.createTextNode(jsonSched["line"]);
				infoLineTitle.appendChild(infoLineWord);

				var infoTripTitle = document.createElement("td");
				infoTripTitle.id = "station";
				var infoTripWord = document.createTextNode(info1["TripID"]);
				infoTripTitle.appendChild(infoTripWord);

				var infoDirectionTitle = document.createElement("td");
				infoDirectionTitle.id = "station";
				var infoDirectionWord = document.createTextNode(info1["Destination"]);
				infoDirectionTitle.appendChild(infoDirectionWord);

				var infoTimeTitle = document.createElement("td");
				infoTimeTitle.id = "station";
				var infoTimeWord = document.createTextNode(getTime(info2["Seconds"]));
				infoTimeTitle.appendChild(infoTimeWord);

				infoTableRow.appendChild(infoLineTitle);
				infoTableRow.appendChild(infoTripTitle);
				infoTableRow.appendChild(infoDirectionTitle);
				infoTableRow.appendChild(infoTimeTitle);
				table.appendChild(infoTableRow);
			}
		}
	}
	return table;
}

function getTime(givenSeconds)
{
	var finalTime;
	var hours = Math.floor(givenSeconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	var minutes = Math.floor(givenSeconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	var seconds = Math.floor(givenSeconds - (minutes * 60));
	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	finalTime = hours + ":" + minutes + ":" + seconds;
	return finalTime;

}



function createPath(lineInfo, lineText) {
	//var bluetxt = '[{"station":"Wonderland","lat":42.41342,"lng":-70.991648},{"station":"Revere Beach","lat":42.40784254,"lng":-70.99253321},{"station":"Beachmont","lat":42.39754234,"lng":-70.99231944},{"station":"Suffolk Downs","lat":42.39050067,"lng":-70.99712259},{"station":"Orient Heights","lat":42.386867,"lng":-71.00473599999999},{"station":"Wood Island","lat":42.3796403,"lng":-71.02286539000001},{"station":"Airport","lat":42.374262,"lng":-71.030395},{"station":"Maverick","lat":42.36911856,"lng":-71.03952958000001},{"station":"Aquarium","lat":42.359784,"lng":-71.051652},{"station":"State Street","lat":42.358978,"lng":-71.057598},{"station":"Government Center","lat":42.359705,"lng":-71.05921499999999},{"station":"Bowdoin","lat":42.361365,"lng":-71.062037}]';
	
	var jsonInfo = JSON.parse(lineText);
	var lineStops = [];
	for (station in jsonInfo) {
		//var newLat = jsonBlue[i]["lat"];
		var newLat = station["lat"];
		//var newLng = jsonBlue[i]["lng"];
		var newLng = station["lng"];
		var latlng = new google.maps.LatLng(newLat, newLng);
		lineStops.push(latlng);
		var stopMarker = new google.maps.Marker({
			position: latlng,
			map:map,
			title: station["station"],
			icon: lineInfo["icon"]
		});
		
		stopMarker.setMap(map);
		
		var infowindow = new google.maps.InfoWindow();  
		google.maps.event.addListener(stopMarker, 'click', (function(stopMarker) {  
			return function() {  
				var content = writeStationInfo(stopMarker.title);
				infowindow.setContent(content);
				infowindow.open(map, stopMarker);  
			}
		})(stopMarker));

	}
	var linePath = new google.maps.Polyline({
		path: lineStops,
		strokeColor: lineInfo["color"],
		strokeOpacity: 1.0,
		strokeWeight: 2
	}); 
	linePath.setMap(map);
}



