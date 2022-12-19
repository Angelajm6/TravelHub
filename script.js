/*const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5075fa32f5msh2d37ef7bc1f9242p1fc222jsn8d4befb79511',
		'X-RapidAPI-Host': 'best-booking-com-hotel.p.rapidapi.com'
	}
};

fetch('https://best-booking-com-hotel.p.rapidapi.com/booking/best-accommodation?cityName=Berlin&countryName=Germany', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

      const option = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5075fa32f5msh2d37ef7bc1f9242p1fc222jsn8d4befb79511',
            'X-RapidAPI-Host': 'flight-info-api.p.rapidapi.com'
        }
    };
    


    const opt = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5075fa32f5msh2d37ef7bc1f9242p1fc222jsn8d4befb79511',
            'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
        }
    };
    
    fetch('https://aerodatabox.p.rapidapi.com/flights/number/DL47?withAircraftImage=false&withLocation=false', opt)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));*/
    

        var welcome = $(".welcome");
        var travelHub =$(".title");
        var click = $(".click");
        var modal = $(".modal");
        var modalBackground = $(".modal-background");
        var modalCard = $(".modal-card");
        var modalCardHead = $(".modal-card-head");
        var modalCardTitle = $(".modal-card-title");
        var modalCardBody = $(".modal-card-body");
        var text = $(".text");
        var modalCardFoot = $(".modal-card-foot");
        var buttonSuccess = $(".button is-success");
        var button = $(".button");
        var hotel = $(".hotel");
        var ratings = $(".ratings");
        var another = $(".another");

        var airlineInput = document.getElementById('airline');
        var f_numberInput = document.getElementById('f_number');
        var find = document.getElementById('find');
        var containerFlight = document.getElementById('flight');
        var containerHotel = document.getElementById('hotel');
        
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;

    });
  });

  var searchHandler = function(event) {
    event.preventDefault();

    var airline_text = airlineInput.value.trim();
    var f_number = f_numberInput.value.trim();

    if(f_number) {
        getFlightDetails(f_number);

        containerFlight.textContent = '';
        f_numberInput.value = '';
        airlineInput.value = '';
    } else {
        alert('Please enter a valid Airline and Flight Number');
    }

  };

  var getFlightDetails = function(f_number) {

        var apiUrl = 'https://aerodatabox.p.rapidapi.com/flights/number/' + f_number + '?withAircraftImage=false&withLocation=false';

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
                response.json().then(function (data){
                    console.log(data);
                    displayFlightDetails(data);
                });
            }
        });
    };

  var displayFlightDetails = function (data) {

    for (var i=0; i < data.length; i++) {
    var aircraft = data[i].aircraft.model;
    var airline = data[i].airline.name;
    var a_arrival_code = data[i].arrival.airport.iata;
    var a_arrival_name = data[i].arrival.airport.name;
    var s_time_local = dayjs(data[i].arrival.quality.scheduledTimeLocal).format('MMM DD, YYYY [at] hh:mm:ss a');
    var a_terminal = data[i].arrival.quality.terminal;
    var a_departure_code = data[i].departure.airport.iata;
    var a_departure_name = data[i].departure.airport.name;
    var a_time_local = dayjs(data[i].departure.actualTimeLocal).format('MMM DD, YYYY [at] hh:mm:ss a');
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
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data){
                    console.log(data);
                    displayHotelDetails(data);
                });
            }
        })



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

  }

  find.addEventListener("click", searchHandler);