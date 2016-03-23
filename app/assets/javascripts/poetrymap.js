// Two styles as examples of how map appearance can be customized; toggle which
// one is commented out to see the other

var mapStyle = "light";
// var mapStyle = "dark";

var attributionContent='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB';

if (mapStyle === "light") {
    // Change this to change the styles for default and currently selected markers
    var defaultStyle = {stroke: true, weight:1, opacity: 0.5, color:'#212121', fillColor: '#212121', fillOpacity: 0.30};
    var selectedStyle = {stroke: true, weight:4, opacity:1, fillOpacity: 0.75, color:'#212121', fillColor:'#212121'};

    // You can customize your own tileset URL here; this examples uses the free "Positron" tile layer from CartoDB
    // https://cartodb.com/basemaps/
    // The map at www.torontopoetry.ca uses a custom layer made using https://www.mapbox.com/; this tileset is
    // not used here because of API limits (you can sign up for your own account to use mapbox tilesets)

    var tileURL='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';

} else if (mapStyle === "dark") {

    var defaultStyle = {stroke: true, weight:1, opacity: 0.5, color:'#FFFFFF', fillColor: '#FFFFFF', fillOpacity: 0.30};
    var selectedStyle = {stroke: true, weight:4, opacity:1, fillOpacity: 0.75, color:'#FFFFFF', fillColor:'#FFFFFF'};
    var tileURL='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';

}

// Change this to recentre the opening latitude and longitude of the map
var defaultLat=43.6711;
var defaultLong=-79.3858;


var lastMarkerClicked;
var defaultContent;
var headerHeight;
var remainingHeight;
var heightOneQuarter;
var heightThreeQuarter;
var locationHeadingHeight;

function setHeightVars() {
    headerHeight = $(".page-header").outerHeight();
    locationHeadingHeight = $(".location-display h1").outerHeight() + parseInt($(".location-display h1").parent().css("padding-top").replace("px",""));
    remainingHeight = $(window).outerHeight() - headerHeight;
    heightOneQuarter = Math.floor(remainingHeight * 0.25);
    heightThreeQuarter = Math.floor(remainingHeight * 0.75);
}

function isMobileWidth() {
  return Modernizr.mq('only screen and (max-width: 640px)');
}

function isDesktopWidth() {
  return Modernizr.mq('only screen and (min-width: 640px)');
}

function handleResize() {
  var mapFocused = true;
  var locationFocused = false;
  if(isMobileWidth()) {
    resizeForMobile();
  } else if(isDesktopWidth()) {
    resizeForDesktop();
  }
}

function resizeForMobile() {
    setHeightVars();
    $("#map-canvas").css({height:remainingHeight-locationHeadingHeight});
    $(".location-display").css({height:locationHeadingHeight});
    map.attributionControl.setPosition("topright");
    map.invalidateSize({pan: true, debounceMoveend:true});
}

function resizeForDesktop() {
    setHeightVars();
    $("#map-canvas").css({height:remainingHeight});
    $(".location-display").css({height:remainingHeight});
    map.attributionControl.setPosition("bottomright");
    map.invalidateSize({pan: true, debounceMoveend:true});
}

function slideMap() {
    setHeightVars();
    $("#map-canvas").animate({height:remainingHeight-locationHeadingHeight});
    $(".location-display").animate({height:locationHeadingHeight}, 400, "swing", function() {
      map.invalidateSize({pan: true, debounceMoveend:true});
    });
}

function slideLocationDisplay() {
    setHeightVars();
    $("#map-canvas").animate({height:heightOneQuarter});
    $(".location-display").animate({height:heightThreeQuarter}, 400, "swing", function() {
      map.invalidateSize({pan: true, debounceMoveend:true});
    });
}

function deselectLastMarker() {
	if(lastMarkerClicked !== null && lastMarkerClicked !== undefined) {
		lastMarkerClicked.setStyle(defaultStyle);
	}
}

function displayLocationDetails(locationId, marker) {
$.getJSON("/locations/"+locationId+".json", function(location) {
    $(".location-display").fadeOut(function() {
    $(".location-title").empty();
    $(".location-title").html(location.name);
    $(".location-image-container").empty();
    $(".location-image-credit-container").empty();
    if(location.image.url !== "" && location.image.url !== null && location.image.url !== undefined) {
      $(".location-image-container").append("<img src='"+location.image.url+"' alt='' />");
      $(".location-image-credit-container").append("<p>"+location.image.credit+"<span id='location-image-more-info'></span></p>");
      if(location.image.creditURL !== "" && location.image.creditURL !== null && location.image.creditURL !== undefined) {
        $("#location-image-more-info").append(" <a href="+location.image.creditURL+">More Information</a>");
      }

    }
    $(".poem-container").empty();
    for(i=0; i<location.poems.length; i++) {
      currentPoem = location.poems[i];
      currentExcerpt = currentPoem.excerpt;
      if(currentExcerpt === null) {
        excerpt = "";
      } else excerpt = currentExcerpt;
      if(currentPoem.source.link === null || currentPoem.source.link === "") {
        bookTitleString = currentPoem.source.title;
      } else bookTitleString = "<a href='"+ currentPoem.source.link + "'>"+currentPoem.source.title  + "</a>";
      $(".poem-container")
      .append("<p class='poem-excerpt'>"+excerpt+"</p>")
      .append("<div class='excerpt-underline'></div>")
      .append("<h2 class='poem-title'>"+ currentPoem.title + "</h2>")
      .append("<p class='poem-credit'><span class='class='poem-author'>By "+currentPoem.poet.firstName+ " " + currentPoem.poet.lastName + "</span><br/>Published in <span class='poem-book'>" + bookTitleString + "</span></p>"); }
    marker.setStyle(selectedStyle);
    lastMarkerClicked = marker;
    });
    $(".location-display").scrollTop(0);
    $(".location-display").fadeIn(function() {
      $(document).foundation('interchange', 'reflow');
    });
});
}

function restoreDefaultContent() {
  deselectLastMarker();
  $(".location-display").html(defaultContent);
  map.panTo(L.latLng(defaultLat,defaultLong));
}

function focusMarker(locationId, marker) {
	map.panTo(marker.getLatLng());
}

function handleMarkerClick(locationId, marker) {
  deselectLastMarker();
  displayLocationDetails(locationId, marker);
  focusMarker(locationId, marker);
  updateDisplayURL(locationId, marker._leaflet_id);
  // trackEvent("Poetry Map","Click",marker.locationName + " - #" + locationId);
}

function handleMarkerBack(locationId, marker) {
  deselectLastMarker();
  displayLocationDetails(locationId, marker);
  focusMarker(locationId, marker);
}

// This function tracks location clicks as pageviews and is
// commented out here, but left in as an example for those who may wish
// to do the same
// function trackEvent(category,action,label) {
//   ga('send', 'event', category,action,label);
// }

function initializeMap() {
	var map = L.map('map-canvas').setView([defaultLat,defaultLong], 13);

	L.tileLayer(tileURL, {
    attribution: attributionContent,
    maxZoom: 18,
    detectRetina:true
	}).addTo(map);
  map.attributionControl.setPrefix(false);

	return map;
}

// Scales the marker size based on the number poems for a location
function getMarkerSize(numberOfPoems) {
	return 40+(40*(numberOfPoems*0.7));
}

function getLocParam() {
    var params = window.location.search.substring(1).split("&");
    for(i=0; i<params.length; i++) {
      param = params[i];
      if(param.substring(0,3) == "loc") {
        return param.substring(4);
      }
    }
    return null;
}

function generateLocationWidePoems(torontoPoems) {
   poemsPerColumn = Math.ceil(numberOfPoems / 3);
        dividedPoems = [];
        while(currentLocation.poems.length > 0) {
          chunk = currentLocation.poems.splice(0,poemsPerColumn);
          dividedPoems.push(chunk);
        }

        $(".location-wide-poems .poem-column").each(function(index) {

          currentPoems = dividedPoems[index];

          for(j = 0; j<currentPoems.length; j++) {
            currentPoem = currentPoems[j];
            currentExcerpt = currentPoem.excerpt;
            if(currentExcerpt === null) {
              excerpt = "{excerpt text here}";
            } else excerpt = currentExcerpt;
            if(currentPoem.source.link === null || currentPoem.source.link === "" || currentPoem.source.link === undefined) {
              bookTitleString = currentPoem.source.title;
            } else bookTitleString = "<a href='"+ currentPoem.source.link + "'>"+currentPoem.source.title + "</a>";
            $(this).append("<p class='poem-excerpt'>"+excerpt+"</p>")
      .append("<div class='excerpt-underline'></div>")
      .append("<h2 class='poem-title'>"+ currentPoem.title + "</h2>")
      .append("<p class='poem-credit'><span class='poem-author'>By "+currentPoem.poet.firstName+ " " + currentPoem.poet.lastName + "</span><br/>Published in <span class='poem-book'>" + bookTitleString + "</span></p>");
          }

        });
}

function revealContent(sectionId, locationId, e) {
  $(sectionId).slideDown();
  updateDisplayURL(locationId);
  e.preventDefault();
}

function hideContent(sectionId, locationId, e) {
  $(sectionId).slideUp();
  if(history.pushState !== null && history.pushState !== undefined) {
    history.pushState(null,"selected location", "?loc=front");
  }
  e.preventDefault();
}

function updateDisplayURL(locationId, markerId) {
  var stateObj = { selectedLocation: locationId, markerId: markerId};
  if(history.pushState !== null && history.pushState !== undefined) {
    history.pushState(stateObj,"selected location", "?loc="+locationId);
  }
}

$(window).bind('popstate', function(event) {
  locParam = getLocParam();
  if(locParam === null || isNaN(locParam)) {
    handleLocParam(locParam);
} else if(isNaN(locParam) === false) {
    selectedLocationId = event.originalEvent.state.selectedLocation;
    selectedMarkerId = event.originalEvent.state.markerId;
    handleMarkerBack(selectedLocationId,map._layers[selectedMarkerId]);
  }

});

function handleLocParam(locParam) {
  if(locParam == "suggestions") {
    $(".add-poems").slideDown();
    $(".location-wide-poems").slideUp();
  } else if(locParam == "location-wide-poems") {
    $(".location-wide-poems").slideDown();
    $(".add-poems").slideUp();
} else if(locParam === "front" || locParam === null) {
    $(".add-poems").slideUp();
    $(".location-wide-poems").slideUp();
    restoreDefaultContent();
  }
}

$(document).ready(function() {
  defaultContent = $(".location-display").html();
  map = initializeMap();
  var mapFocused = true;
  var locationFocused = false;
  $("#location-wide-poems-show").click(function(e) {
    revealContent(".location-wide-poems","location-wide-poems",e);
    $(".add-poems").slideUp();
    // trackEvent("Poetry Map","Click","Toronto Poems");
  });

  $("#location-wide-poems-hide").click(function(e) {
    hideContent(".location-wide-poems","location-wide-poems",e);
  });

  $("#add-poems-show").click(function(e) {
    revealContent(".add-poems","suggestions",e);
    $(".location-wide-poems").slideUp();
    // trackEvent("Poetry Map","Click","Suggest Poems");
  });

  $("#add-poems-hide").click(function(e) {
    hideContent(".add-poems","suggestions",e);
  });

$(".location-display").bind("mouseenter touchstart", function(e) {
  if(isMobileWidth() & mapFocused === true) {
    slideLocationDisplay();
    mapFocused = false;
    locationFocused = true;
  }
  });

$("#map-canvas").bind("mouseenter touchstart", function(e) {
  if(isMobileWidth() & locationFocused === true) {
    slideMap();
    mapFocused = true;
    locationFocused = false;
  }
  });

  var locationIdFromURL = getLocParam();
  handleLocParam(locationIdFromURL);

	$.getJSON("/locations.json", function(locations) {
    // We sort by the number of poems on each location before adding the layers to the map to put the bigger circles on the bottom of the z-index, so they don't prevent clicking the ones within them
    locations.sort(function(a,b) {
        return b.poems.length - a.poems.length;
    });

    for(i = 0; i<locations.length; i++) {
    	currentLocation = locations[i];
      numberOfPoems = currentLocation.poems.length;

      if(currentLocation.name === 'Generic Toronto') {
        generateLocationWidePoems(currentLocation.poems);
      }

      if(currentLocation.name != 'Generic Toronto' && numberOfPoems > 0) {
      	markerSize = getMarkerSize(numberOfPoems);
    		var marker = L.circle([currentLocation.latitude, currentLocation.longitude], markerSize, defaultStyle).on('click',function(e) {
    			handleMarkerClick(this.locationId, this);
    		}).addTo(map);

    		marker.locationId = currentLocation.id;
        marker.locationName = currentLocation.name;
    		marker.numberOfPoems = numberOfPoems;
        if(currentLocation.id == locationIdFromURL) {
          handleMarkerClick(locationIdFromURL, marker);
          map.setZoom(14);
        }
    }
    }
    $(document).foundation('interchange', 'reflow');
  });

    handleResize();
    $(window).resize(function() {
      handleResize();
  });

    $(document).foundation();
});
