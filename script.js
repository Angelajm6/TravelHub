
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

        f_numberInput.value = '';
        airlineInput.value = '';

        var queryString = './result.html?f=' + f_number + '&a=' + airline_text;

  location.assign(queryString);
} else {
        alert('Please enter a valid Airline and Flight Number');
    }

  };

  find.addEventListener("click", searchHandler);