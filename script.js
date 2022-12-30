
        var click = $(".click");
        var find = document.getElementById('find');
        var modal = $(".modal");
        var modalBackground = $(".modal-background");
        var modalCard = $(".modal-card");
        var modalCardHead = $(".modal-card-head");
        var modalCardTitle = $(".modal-card-title");
        var modalCardBody = $(".modal-card-body");
        var modalCardFoot = $(".modal-card-foot");
        var airlineInput = document.getElementById('airline');
        var f_numberInput = document.getElementById('f_number');
        var dateInput = $('#datepicker');
        var error = document.getElementById('error');

      

  var searchHandler = function(event) {
    event.preventDefault();

    var airline_text = airlineInput.value.trim();
    var f_number = f_numberInput.value.trim();
    var i_date = dateInput.val();
    var date = i_date.split("/").reverse();
    var tmp = date[2];
    date[2] = date[1];
    date[1] = tmp;
    date = date.join("-");

    if(f_number) {
  
        f_numberInput.value = '';
        airlineInput.value = '';
        dateInput.value = '';

        var queryString = './result.html?f=' + f_number + '&a=' + airline_text + '&d=' + date;

  location.assign(queryString);
} else {
      error.classList.remove('hide');
    }

  };

  $(function () {
    $('#datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });

  find.addEventListener("click", searchHandler);