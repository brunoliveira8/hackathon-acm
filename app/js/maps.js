var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

 function initialize() {
 		
 		directionsDisplay = new google.maps.DirectionsRenderer();
 		var markers = [];

 		var myLatlng = new google.maps.LatLng(36.067386,-94.156918);
        var mapOptions = {
          center: new google.maps.LatLng(36.067386, -94.156918),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
        directionsDisplay.setMap(map);
        var image = 'img/packet-icon1.png';

          // Create the search box and link it to the UI element.
		  var input = /** @type {HTMLInputElement} */(
		      document.getElementById('pac-input'));
		  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var marker1 = new google.maps.Marker({
      	position: myLatlng,
      	map: map,
      	title: 'Hello World!',
      	icon: image
 	 	});

 	 	var marker2 = new google.maps.Marker({
      	position: new google.maps.LatLng(37.067386,-93.156918),
      	map: map,
      	title: 'Hello World!',
      	icon: image
 	 	});

 	 	var marker3 = new google.maps.Marker({
      	position: new google.maps.LatLng(38.067386,-94.156918),
      	map: map,
      	title: 'Hello World!',
      	icon: image
 	 	});

 	 	 var contentString = '<div id="content">'+
	      '<div id="siteNotice">'+
	      '</div>'+
	      '<h1 id="firstHeading" class="firstHeading">Freight</h1>'+
	      '<div id="bodyContent">'+
	      '<p><b>PRICE:</b>  <b>$99.00</b>'+
	      '<p><b>SOURCE ADRESS:</b>  <b>1, University of Arkansas</b>'+
	      '<p><b>DESTINATION ADRESS:</b>  <b>Southwest 300th Road, KS</b>'+
	      '<p><b>DISTANCE:</b>  <b>50 miles</b></br>'+
	      '<button class="btn btn-primary">GET IT</button>'+
	      '</div>'+
	      '</div>';

	  var infowindow = new google.maps.InfoWindow({
	      content: contentString,
	      maxWidth: 400
	  });

	  google.maps.event.addListener(marker1, 'click', function() {
    	calcRoute();
    	infowindow.open(map,marker1);

  	});

 }

function calcRoute() {
  //var start = document.getElementById('start').value;
  //var end = document.getElementById('end').value;

  console.log("hello");
  var start = new google.maps.LatLng(36.067386,-94.156918);
  var end = new google.maps.LatLng(38.067386,-95.156918);

  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}
