/*** MapKit Settings ***/

// From https://developer.apple.com/wwdc/attending/
var apiKey = "b2af5300a3c2ea9b5d38c782c7d2909dc88d6621";

// Needed to bypasss origin issue
var bootstrapJsonUrl = "./bootstrap.json";

// MapKit Init
mapkit.init({
    apiKey: apiKey,
    bootstrapUrl: bootstrapJsonUrl
});

// Set mapKit div to map object
var map = new mapkit.Map('map');

// Set map to hybrid view (hybrid|standard|satellite)
map.mapType = "hybrid";

// Zoom map to Apple HQ (1 Infinite Loop) on load
var appleHQ = new mapkit.CoordinateRegion(
        new mapkit.Coordinate(37.331707, -122.029583),
        new mapkit.CoordinateSpan(0.01, 0.01)
);
map.setRegionAnimated(appleHQ);

// User Location settings
map.showsUserLocation = false;
map.showsUserLocationControl = true;

/*** End MapKit ***/

/* Not Working
document.getElementById("map").addEventListener("wheel", function(e) {
    var newLoc;

    if (e.wheelDelta < 0) {
        console.log("Down");
        newLoc = new mapkit.CoordinateRegion(
                new mapkit.Coordinate(map.center.latitude, map.center.longitude),
                new mapkit.CoordinateSpan(map.region.span.latitudeDelta, map.region.span.longitudeDelta)
        );
    } else {
        console.log("Up");
        newLoc = new mapkit.CoordinateRegion(
                new mapkit.Coordinate(map.center.latitude, map.center.longitude),
                new mapkit.CoordinateSpan(map.region.span.latitudeDelta, map.region.span.longitudeDelta)
        );
    }

    console.log("Map Lat/Long: " + map.region.span.latitudeDelta + "/" + map.region.span.longitudeDelta);
    console.log("New Lat/Long: " + newLoc.span.latitudeDelta + "/" + newLoc.span.longitudeDelta);

    map.setRegionAnimated(newLoc);
});
*/

document.getElementById("map").addEventListener("click", function() {
    changeStyleForMapType(map.mapType);
});

function changeStyleForMapType(type) {

    if (type == "standard") {

        var ghl = document.getElementById("github-light");
        if (ghl != null) {
            ghl.id = "github-dark";
        }

        document.getElementById("searchBox").className = "searchbox-dark";

    } else if (type == "hybrid" || type == "satellite") {

        var ghd = document.getElementById("github-dark");
        if (ghd != null) {
            ghd.id = "github-light";
        }

        document.getElementById("searchBox").className = "searchbox-light";
    }
};
