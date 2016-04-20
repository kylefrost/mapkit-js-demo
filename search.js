/*** Globals ***/
var points = [];

var calloutDelegate = {

    calloutContentForAnnotation: function(annotation) {
        var element = document.createElement("div");
        element.className = "mk-standard";

        var title = element.appendChild(document.createElement("div"));
        title.className = "mk-title";
        title.textContent = annotation.title;

        var subtitle = element.appendChild(document.createElement("div"));
        subtitle.className = "mk-subtitle";
        subtitle.textContent = annotation.subtitle;

        return element;
    }
};

function addPoints(err, results) {
    var index;

    for(index = 0; index < results.places.length; index++) {
        var pOptions = {
            title: results.places[index].name,
            subtitle: results.places[index].formattedAddress,
            callout: calloutDelegate
        };

        var p = new mapkit.PinAnnotation(results.places[index].coordinate, pOptions);
        //map.addAnnotation(p);
        points.push(p);
    }

    //map.addAnnotations(points);
}

function goToOnMap(loc) {
    console.log(loc);

    var pinOptions = {
        title: loc.item.label,
        subtitle: loc.item.address,
        selected: true,
        callout: calloutDelegate
    };
    var pin = new mapkit.PinAnnotation(loc.item.coordinate, pinOptions);

    map.setCenterAnimated(loc.item.coordinate);
    map.addAnnotation(pin);
}

function autoComplete(err, results) {
    var index;
    var places = [];

    console.log(results);

    for(index = 0; index < results.results.length; index++) {
        var item = {
            label: results.results[index].displayLines[0],
            address: results.results[index].displayLines[1],
            coordinate: (results.results[index].coordinate != null ? results.results[index].coordinate : null)
        };

        places.push(item);
    }

    suggest(places);
}

function suggest(places) {
    console.log("Got suggestions.");
    
    $("#searchBox").autocomplete({
        source: places,
        select: function(event, ui) {
            map.removeAnnotations(map.annotations);
            goToOnMap(ui);
        }
    })
    .autocomplete("instance")._renderItem = function (ul, item) {
        console.log(item);
        return $("<li></li>")
            .append("<a><span class=\"autocompleteLabel\">" + 
                    item.label + 
                    "</span><br><span class=\"autocompleteSubtitle\">" + 
                    (item.address != null ? item.address : "") + 
                    "</span></a>")
            .appendTo(ul);
    };
}

var s = new mapkit.Search();

document.getElementById("searchBox").addEventListener("input", function() {
    s.coordinate = map.center;
    s.region = map.region;
    if (document.getElementById("searchBox").value != "")
        s.autocomplete(document.getElementById("searchBox").value, autoComplete);
});

//s.coordinate = new mapkit.Coordinate(37.331707, -122.029583);
//s.region = new mapkit.CoordinateRegion(new mapkit.Coordinate(37.331707, -122.029583), new mapkit.CoordinateSpan(0.01, 0.01));

//s.search("food", addPoints);
