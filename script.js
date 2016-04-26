$(document).ready(function(){
			popup = L.popup();
			mymap = L.map('mapid');
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(mymap); 			
function onMapClick(e) {
			    popup
			        .setLatLng(e.latlng)
			        .setContent("You clicked the map at " + e.latlng.toString())
			        .openOn(mymap);
			}mymap.on('click', onMapClick);   
function onLocationFound(e) {
		var radius = e.accuracy / 2;			
		L.marker(e.latlng).addTo(mymap)
		.bindPopup("You are within " + radius + " meters from this point").openPopup();	
		L.circle(e.latlng, radius).addTo(mymap);
		}mymap.on('locationfound', onLocationFound);
function onLocationError(e) {
			    alert(e.message);
			}
			mymap.on('locationerror', onLocationError);
			mymap.on('click', onMapClick);
			mymap.locate({setView: true, maxZoom: 16});
});
function addr_search() {
  inp = document.getElementById("addr");
  $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function(data) {	
	  var items = [];
		$.each(data, function(key, val) {
		  items.push(
		    "<li><a href='#' onclick='chooseAddr(" +
		    val.lat + ", " + val.lon + ");return false;'>" + val.display_name +
		    '</a></li>'
		  );
	});
	$('#results').empty();
    if (items.length != 0) {
      $('<p>', { html: "Search results:" }).appendTo('#results');
      $('<ul/>', {
        'class': 'my-new-list',
        html: items.join('')
      }).appendTo('#results');
    } else {
      $('<p>', { html: "No results found" }).appendTo('#results');
    }
  });
}
function chooseAddr(lat, lng, type) {
  var location = new L.LatLng(lat, lng);
  mymap.panTo(location);
	getImg();
  if (type == 'city' || type == 'administrative') {
    mymap.setZoom(11);
  } else {
    mymap.setZoom(13);
  }
}
function getImg(){
		var JSONP2 = "http://api.flickr.com/services/feeds/photos_public.gne?tags=" + inp.value + "&tagmode=any&format=json&jsoncallback=?"
		$("#imagenes").empty();
		$.getJSON( JSONP2, function( data ) {
			$.each( data.items, function( i, item ) {
				console.log("entra")
			    $( "<img>" ).attr( "src", item.media.m ).appendTo( "#imagenes" );
			  });
		});
}	
