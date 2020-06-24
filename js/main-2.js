$( function() {
    $( "#dslider, #dslider2" ).slider({
				range: "min",
				value: 1440,
        min: 0,
        max: 1440,
        step: 5,
        slide: function(e, ui) {
            var hours = Math.floor(ui.value / 60);
            var minutes = ui.value - (hours * 60);

            if(hours.toString().length == 1) hours = '0' + hours;
            if(minutes.toString().length == 1) minutes = '0' + minutes;

            $('.dslider-time').html(hours+' h '+minutes+' min');
        }
    });
});

$('.button-calendar').click(function(e){
	e.preventDefault();
if (!$(this).hasClass('active')) {
  $(this).addClass('active');
	$('.calendar-block').slideDown();
	if ($(window).width() <= '900'){
      $('.button-calendar').html('Close <i class="calendar-icon"></i>');
  } else {
      $('.button-calendar').html('Close calendar <i class="calendar-icon"></i>');
  }
	if ($(window).width() <= '760'){
			$('.button-calendar').html('<i class="calendar-icon"></i>');
	}
	} else {
	    $(this).removeClass('active');
			$('.calendar-block').slideUp();
			if ($(window).width() <= '900'){
	        $('.button-calendar').html('Open <i class="calendar-icon"></i>');
	    } else {
	        $('.button-calendar').html('Open calendar <i class="calendar-icon"></i>');
	    }
			if ($(window).width() <= '760'){
					$('.button-calendar').html('<i class="calendar-icon"></i>');
			}
	}
});
$('.button-depart').click(function(e){
	e.preventDefault();
	$(this).addClass('active');
	$('.button-return').removeClass('active');
	$('#datepicker').attr('style', 'z-index: 1; display: block');
	$('#datepicker-2').attr('style', 'z-index: -1; display: none');

});
$('.button-return').click(function(e){
	e.preventDefault();
	$(this).addClass('active');
	$('.button-depart').removeClass('active');
	$('#datepicker').attr('style', 'z-index: -1; display: none;');
	$('#datepicker-2').attr('style', 'z-index: 1; display: block');
});

$(function() {
var dayrates = [657, 634, 600, 650, 620,' ',632];
var dateToday = new Date();
$("#datepicker, #datepicker-2").datepicker({
	minDate: dateToday,
  beforeShowDay: function(date) {
    var selectable = true;
		if (dayrates[date.getDay()] <= 620){
			var classname = "low-price";
		}else{
			var classname = "price-date";
		}

    var title = "" + dayrates[date.getDay()];
    return [selectable, classname, title];
  }
});
});

jQuery(document).ready(function(){
		jQuery('#refresh_modal').modal('show');
		if ($(window).width() <= '900'){
				$('.button-calendar').html('Open <i class="calendar-icon"></i>');
		}else {
				$('.button-calendar').html('Open calendar <i class="calendar-icon"></i>');
		}
		if ($(window).width() <= '760'){
				$('.button-calendar').html('<i class="calendar-icon"></i>');
		}
});

$('.hamburger-link').click(function(e){
	e.preventDefault();
	$('.mobile-container').attr('style', 'left: 0');
});
$('.close-link').click(function(e){
	e.preventDefault();
	$('.mobile-container').attr('style', 'left: -250px');
});

document.addEventListener("touchstart", function(){}, true);
