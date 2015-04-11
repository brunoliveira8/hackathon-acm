// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

var map;

function initialize() {

  var markers = [];
  var image = 'img/packet-icon1.png';
  var mapOptions = {
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
  map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);

  var geocoder = new google.maps.Geocoder();

      geocoder.geocode({'address': 'US'}, function (results, status) {
         var ne = results[0].geometry.viewport.getNorthEast();
         var sw = results[0].geometry.viewport.getSouthWest();

         map.fitBounds(results[0].geometry.viewport);               
      }); 

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      google.maps.event.addListener(marker, 'click', function() {
      map.setZoom(8);
      map.setCenter(marker.getPosition());
      var source;
      geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {

            source = results[1].formatted_address;
            var price = prompt("Price: ");
            var destination = prompt("Destination: ");
            var contentString = '<div class="info-window">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h2 id="firstHeading" class="firstHeading">Freight 1</h2>'+
            '<div id="bodyContent">'+
            '<table style="font-size: 12px" class="table"><tbody>'+
            '<tr align="left"><td ><b>PRICE:</b></td> <td><b>'+price+'</b></td></tr>'+
            '<tr align="left" ><td><b>SOURCE:</b> </td> <td><b>'+source+'</b></td></tr>'+
            '<tr align="left"><td><b>DESTINATION:</b></td><td>  <b>'+destination+'</b></td></tr>'+
            '<tr align="left" ><td><b>DISTANCE:</b></td>  <td><b>50 miles</b></td></tr>'+
            '</tbody></table><br>'+
            '</div>'+
            '</div>';
          
        infowindow.addTab('Freight 1', contentString);
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });
      
      var infowindow = new InfoBubble({
        maxWidth: 800,
        backgroundColor: '#ffe513',
          borderRadius: 10,
          borderWidth: 5,
          borderColor: '#0000',
      });

      
        marker.setIcon("img/packet-icon1.png");

          google.maps.event.addListener(marker, 'mouseover', function() {
              infowindow.open(map,marker);
          });

        });

      
    

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}