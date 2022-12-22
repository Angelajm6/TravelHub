
var containerFlight = document.getElementById('flight');
var containerHotel = document.getElementById('hotel');
var welcome = document.getElementById('welcome');
var another = document.getElementById('another');
var s_hotel_map = document.getElementById('s_hotel');

function getParams() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var searchParamsArr = document.location.search.split('&');
  
    // Get the query and format values
    var f_number = searchParamsArr[0].split('=').pop();
    var airlineInput = searchParamsArr[1].split('=').pop();
  
    getFlightDetails(f_number);
  }
        


var getFlightDetails = function(f_number) {

    var apiUrl = 'https://aerodatabox.p.rapidapi.com/flights/number/' + f_number + '?withAircraftImage=false&withLocation=false&limit=2';

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5075fa32f5msh2d37ef7bc1f9242p1fc222jsn8d4befb79511',
            'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
        }
    })

    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                displayFlightDetails(data);
            });
        }
    });
};

var displayFlightDetails = function (data) {

var header = document.createElement('h1');
header.classList= 'list-group-item';
header.textContent = 'Showing flights for - ' + flight_number;


for (var i=0; i < data.length; i++) {
var aircraft = data[i].aircraft.model;
var airline = data[i].airline.name;
var a_arrival_code = data[i].arrival.airport.iata;
var a_arrival_name = data[i].arrival.airport.name;
var s_time_local = dayjs(data[i].arrival.quality.scheduledTimeLocal).format('MMM DD, YYYY [at] hh:mm a');
var a_terminal = data[i].arrival.quality.terminal;
var a_departure_code = data[i].departure.airport.iata;
var a_departure_name = data[i].departure.airport.name;
var a_time_local = dayjs(data[i].departure.scheduledTimeLocal).format('MMM DD, YYYY [at] hh:mm a');
var d_terminal = data[i].departure.quality.terminal;
var status = data[i].status;
var flight_number = data[i].number;
var location = data[i].arrival.airport.municipalityName;
var regionName = new Intl.DisplayNames(['en'], {type: 'region'});
var country = regionName.of(data[i].arrival.airport.countryCode);

var flightContainer = document.createElement('div');
flightContainer.classList = 'card';

var listEl = document.createElement('ul');
listEl.classList = 'list-group list-group-flush';

flightContainer.appendChild(listEl);

var flight_numberEl = document.createElement('li');
flight_numberEl.classList = 'list-group-item';
flight_numberEl.textContent = flight_number;

listEl.appendChild(flight_numberEl);

var airlineEl = document.createElement('li');
airlineEl.classList = 'list-group-item';
airlineEl.textContent = airline;

listEl.appendChild(airlineEl);

var statusEL = document.createElement('li');
statusEL.classList = 'list-group-item';
statusEL.textContent = status;

var departure = document.createElement('li');
departure.classList = 'list-group-item';
departure.textContent = 'Departure Details';

listEl.appendChild(departure);

var d_name = document.createElement('li');
d_name.classList = 'list-group-item';
d_name.textContent = a_departure_name;

listEl.appendChild(d_name);

var d_code = document.createElement('li');
d_code.classList = 'list-group-item';
d_code.textContent = a_departure_code;

listEl.appendChild(d_code);

var departure_t = document.createElement('li');
departure_t.classList = 'list-group-item';
departure_t.textContent = 'Terminal: ' + d_terminal;

listEl.appendChild(departure_t);

var d_time = document.createElement('li');
d_time.classList = 'list-group-item';
d_time.textContent = 'Departs: ' + a_time_local;

listEl.appendChild(d_time);

var arrival = document.createElement('li');
arrival.classList = 'list-group-item';
arrival.textContent = 'Arrival Details';

listEl.appendChild(arrival);

var a_name = document.createElement('li');
a_name.classList = 'list-group-item';
a_name.textContent = a_arrival_name;

listEl.appendChild(a_name);

var a_code = document.createElement('li');
a_code.classList = 'list-group-item';
a_code.textContent = a_arrival_code;

listEl.appendChild(a_code);

var arrival_t = document.createElement('li');
arrival_t.classList = 'list-group-item';
arrival_t.textContent = 'Terminal: ' + a_terminal;

listEl.appendChild(arrival_t);

var a_time = document.createElement('li');
a_time.classList = 'list-group-item';
a_time.textContent = 'Arrives: ' + s_time_local;

listEl.appendChild(a_time);

containerFlight.appendChild(flightContainer);
};

getHotelDetails(location, country);
};

var getHotelDetails = function (location, country) {

    var apiUrl = 'https://best-booking-com-hotel.p.rapidapi.com/booking/best-accommodation?cityName=' + location + '&countryName=' + country;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5075fa32f5msh2d37ef7bc1f9242p1fc222jsn8d4befb79511',
            'X-RapidAPI-Host': 'best-booking-com-hotel.p.rapidapi.com'
        }
    })
    let saved_data = {
        link: "https://www.booking.com/hotel/de/eastseven-berlin-hostel-berlin1.de.html?aid=1938431",
        name: "EastSeven Berlin",
        rating: 9.1
      } 
    displayHotelDetails(saved_data);
    


    /*.then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data){
                console.log(data);
                displayHotelDetails(data);
            });
        }
    })*/


};

var displayHotelDetails = function(data) {

var h_name = data.name;
var h_link = data.link;
var rating = data.rating;

var hotelContainer = document.createElement('div');
hotelContainer.classList = 'card';

var list_h_El = document.createElement('ul');
list_h_El.classList = 'list-group list-group-flush';

hotelContainer.appendChild(list_h_El);

var hotel_d = document.createElement('li');
hotel_d.classList = 'list-group-item';
hotel_d.textContent = 'Checkout the best rated nearby hotel!';

list_h_El.appendChild(hotel_d);

var hotel_nEl = document.createElement('a');
hotel_nEl.classList = 'list-group-item';
hotel_nEl.textContent = h_name;
hotel_nEl.href = h_link;

list_h_El.appendChild(hotel_nEl);

var hotel_r = document.createElement('li');
hotel_r.classList = 'list-group-item';
hotel_r.textContent = 'Ratings: ' + rating;

list_h_El.appendChild(hotel_r);

containerHotel.appendChild(hotelContainer);

};

// This example uses the autocomplete feature of the Google Places API.
// It allows the user to find all hotels in a given place, within a given
// country. It then displays markers for all the hotels returned,
// with on-click details for each hotel.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let places;
let infoWindow;
let markers = [];
let autocomplete;
const countryRestrict = { country: "us" };
const MARKER_PATH =
"https://developers.google.com/maps/documentation/javascript/images/marker_green";
const hostnameRegexp = new RegExp("^https?://.+?/");
const countries = {
au: {
center: { lat: -25.3, lng: 133.8 },
zoom: 4,
},
br: {
center: { lat: -14.2, lng: -51.9 },
zoom: 3,
},
ca: {
center: { lat: 62, lng: -110.0 },
zoom: 3,
},
fr: {
center: { lat: 46.2, lng: 2.2 },
zoom: 5,
},
de: {
center: { lat: 51.2, lng: 10.4 },
zoom: 5,
},
mx: {
center: { lat: 23.6, lng: -102.5 },
zoom: 4,
},
nz: {
center: { lat: -40.9, lng: 174.9 },
zoom: 5,
},
it: {
center: { lat: 41.9, lng: 12.6 },
zoom: 5,
},
za: {
center: { lat: -30.6, lng: 22.9 },
zoom: 5,
},
es: {
center: { lat: 40.5, lng: -3.7 },
zoom: 5,
},
pt: {
center: { lat: 39.4, lng: -8.2 },
zoom: 6,
},
us: {
center: { lat: 37.1, lng: -95.7 },
zoom: 3,
},
uk: {
center: { lat: 54.8, lng: -4.6 },
zoom: 5,
},
};

function initMap() {
map = new google.maps.Map(document.getElementById("map"), {
zoom: countries["us"].zoom,
center: countries["us"].center,
mapTypeControl: false,
panControl: false,
zoomControl: false,
streetViewControl: false,
});
infoWindow = new google.maps.InfoWindow({
content: document.getElementById("info-content"),
});
// Create the autocomplete object and associate it with the UI input control.
// Restrict the search to the default country, and to place type "cities".
autocomplete = new google.maps.places.Autocomplete(
document.getElementById("autocomplete"),
{
  types: ["(cities)"],
  componentRestrictions: countryRestrict,
  fields: ["geometry"],
}
);
places = new google.maps.places.PlacesService(map);
autocomplete.addListener("place_changed", onPlaceChanged);
// Add a DOM event listener to react when the user selects a country.
document
.getElementById("country")
.addEventListener("change", setAutocompleteCountry);
}

// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged() {
const place = autocomplete.getPlace();

if (place.geometry && place.geometry.location) {
map.panTo(place.geometry.location);
map.setZoom(15);
search();
} else {
document.getElementById("autocomplete").placeholder = "Enter a city";
}
}

// Search for hotels in the selected city, within the viewport of the map.
function search() {
const search = {
bounds: map.getBounds(),
types: ["lodging"],
};

places.nearbySearch(search, (results, status, pagination) => {
if (status === google.maps.places.PlacesServiceStatus.OK && results) {
  clearResults();
  clearMarkers();

  // Create a marker for each hotel found, and
  // assign a letter of the alphabetic to each marker icon.
  for (let i = 0; i < results.length; i++) {
    const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
    const markerIcon = MARKER_PATH + markerLetter + ".png";

    // Use marker animation to drop the icons incrementally on the map.
    markers[i] = new google.maps.Marker({
      position: results[i].geometry.location,
      animation: google.maps.Animation.DROP,
      icon: markerIcon,
    });
    // If the user clicks a hotel marker, show the details of that hotel
    // in an info window.
    // @ts-ignore TODO refactor to avoid storing on marker
    markers[i].placeResult = results[i];
    google.maps.event.addListener(markers[i], "click", showInfoWindow);
    setTimeout(dropMarker(i), i * 100);
    addResult(results[i], i);
  }
}
});
}

function clearMarkers() {
for (let i = 0; i < markers.length; i++) {
if (markers[i]) {
  markers[i].setMap(null);
}
}

markers = [];
}

// Set the country restriction based on user input.
// Also center and zoom the map on the given country.
function setAutocompleteCountry() {
const country = document.getElementById("country").value;

if (country == "all") {
autocomplete.setComponentRestrictions({ country: [] });
map.setCenter({ lat: 15, lng: 0 });
map.setZoom(2);
} else {
autocomplete.setComponentRestrictions({ country: country });
map.setCenter(countries[country].center);
map.setZoom(countries[country].zoom);
}

clearResults();
clearMarkers();
}

function dropMarker(i) {
return function () {
markers[i].setMap(map);
};
}

function addResult(result, i) {
const results = document.getElementById("results");
const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
const markerIcon = MARKER_PATH + markerLetter + ".png";
const tr = document.createElement("tr");

tr.style.backgroundColor = i % 2 === 0 ? "#F0F0F0" : "#FFFFFF";
tr.onclick = function () {
google.maps.event.trigger(markers[i], "click");
};

const iconTd = document.createElement("td");
const nameTd = document.createElement("td");
const icon = document.createElement("img");

icon.src = markerIcon;
icon.setAttribute("class", "placeIcon");
icon.setAttribute("className", "placeIcon");

const name = document.createTextNode(result.name);

iconTd.appendChild(icon);
nameTd.appendChild(name);
tr.appendChild(iconTd);
tr.appendChild(nameTd);
results.appendChild(tr);
}

function clearResults() {
const results = document.getElementById("results");

while (results.childNodes[0]) {
results.removeChild(results.childNodes[0]);
}
}

// Get the place details for a hotel. Show the information in an info window,
// anchored on the marker for the hotel that the user selected.
function showInfoWindow() {
// @ts-ignore
const marker = this;

places.getDetails(
{ placeId: marker.placeResult.place_id },
(place, status) => {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    return;
  }

  infoWindow.open(map, marker);
  buildIWContent(place);
}
);
}

// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
document.getElementById("iw-icon").innerHTML =
'<img class="hotelIcon" ' + 'src="' + place.icon + '"/>';
document.getElementById("iw-url").innerHTML =
'<b><a href="' + place.url + '">' + place.name + "</a></b>";
document.getElementById("iw-address").textContent = place.vicinity;
if (place.formatted_phone_number) {
document.getElementById("iw-phone-row").style.display = "";
document.getElementById("iw-phone").textContent =
  place.formatted_phone_number;
} else {
document.getElementById("iw-phone-row").style.display = "none";
}

// Assign a five-star rating to the hotel, using a black star ('&#10029;')
// to indicate the rating the hotel has earned, and a white star ('&#10025;')
// for the rating points not achieved.
if (place.rating) {
let ratingHtml = "";

for (let i = 0; i < 5; i++) {
  if (place.rating < i + 0.5) {
    ratingHtml += "&#10025;";
  } else {
    ratingHtml += "&#10029;";
  }

  document.getElementById("iw-rating-row").style.display = "";
  document.getElementById("iw-rating").innerHTML = ratingHtml;
}
} else {
document.getElementById("iw-rating-row").style.display = "none";
}

// The regexp isolates the first part of the URL (domain plus subdomain)
// to give a short URL for displaying in the info window.
if (place.website) {
let fullUrl = place.website;
let website = String(hostnameRegexp.exec(place.website));

if (!website) {
  website = "http://" + place.website + "/";
  fullUrl = website;
}

document.getElementById("iw-website-row").style.display = "";
document.getElementById("iw-website").textContent = website;
} else {
document.getElementById("iw-website-row").style.display = "none";
}
}
getParams();

window.initMap = initMap;