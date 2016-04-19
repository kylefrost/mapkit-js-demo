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
