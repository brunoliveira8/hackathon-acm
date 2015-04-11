 function initialize() {

 		var myLatlng = new google.maps.LatLng(36.067386,-94.156918);
        var mapOptions = {
          center: new google.maps.LatLng(36.067386, -94.156918),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);

        var image = 'img/packet-icon1.png';

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
	      '<p><b>DESTINATION ADRESS:</b>  <b>Walmart</b>'+
	      '<p><b>DISTANCE:</b>  <b>50 miles</b></br>'+
	      '<button class="btn btn-primary">GET IT</button>'+
	      '</div>'+
	      '</div>';

	  var infowindow = new google.maps.InfoWindow({
	      content: contentString,
	      maxWidth: 400
	  });

	  google.maps.event.addListener(marker1, 'click', function() {
    	infowindow.open(map,marker1);
  	});


 }