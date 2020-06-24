var table;

var ci = 0;

function setCountry(code) {
	APP.setClientValue('country', code, 2678400);
	document.location.reload();
	return false;
}

function setCurrency(code) {
	APP.setClientValue('currency', code, 2678400);
	document.location.reload();
	return false;
}

function setLanguage(code) {
	APP.setClientValue('locale', code, 2678400);
	document.location.reload();
	return false;
}

function showErrorPopover(field, text) {
	$(field).popover({
		container: 'body',
		content: text,
		placement: 'bottom',
		html: true
	}).popover('show');
}

function clearBlocks() {
	var field = [
		'place_from',
		'place_to',
		'date_start',
		'date_finish'];

	// field.map(function(e) {
	//     $('#'+e).val('');
	// });

	var rem = [
		'empty_block',
	]
	rem.map(function (e) {
		$('.' + e).rem;
	});
}

function check_required_fields() {
	var result = true;
	if ($('#place_from').val().trim() == '') {

		showErrorPopover('#place_from', '<span class="text-danger">Please enter your City or Airport</span>');
		result = false;
	}
	if ($('#place_to').val().trim() == '') {
		showErrorPopover('#place_to', '<span class="text-danger">Please enter your City or Airport</span>');
		result = false;
	}
	if ($('#date_start').val().trim() == '') {
		showErrorPopover('#date_start', '<span class="text-danger">Please select valid dates</span>');
		result = false;
	}

	if ($("#place_from_id").val().trim() == '') {
		showErrorPopover('#place_from', '<span class="text-danger">Please select a valid City or Airport</span>');
		result = false;
	}

	if ($("#place_to_id").val().trim() == '') {
		showErrorPopover('#place_to', '<span class="text-danger">Please select a valid City or Airport</span>');
		result = false;
	}

	return result;
}

function doSearch(pageIndex) {
	
	$('#search_result').html('');

    if ($("body").hasClass("stop-second-animation")) {
		$("body").removeClass("stop-second-animation");
	};

	if (check_required_fields()) {

		if (pageIndex == 0) {
			setProgress();
			$('#session').val('');
		}

		document.location.href = '#' + $('#place_from_id').val()
			 + '/'
			 + $('#place_to_id').val()
			 + '/'
			 + $('#date_start_id').val()
			 + '/'
			 + $('#date_finish_id').val()
			 + '/'
			 + ($('#direct_fly').is(':checked') ? 1 : 0)
			 + '/'
			 + $('#class').val()
			 + '/'
			 + $('#adults').val() + '+' + $('#children').val() + '+' + $('#infants').val()
			 + '/'
			 + pageIndex
			 + '/'
			 + Math.random();
	}
}

function showDetail(obj) {
	var uri = $(obj).attr('data-uri');
	var body = $(obj).attr('data-body');
	$.post('/booking-detail', {
		uri: uri,
		body: body
	}, function (data) {
		$('#booking_detail_info').html(data);
		$('#booking_detail_modal').modal();
	}, 'html');
}

function showAgent(id) {
	var html = '';
	html = '<span><img src="' + agents[id].ImageUrl + '" title="' + agents[id].Name + '" alt="' + agents[id].Name + '" /></span>';
	$('#agentId_' + id).html(html);
}

function getDate(element) {
	var date;
	try {
		date = $.datepicker.parseDate("dd.mm.yy", element.value);
	} catch (error) {
		date = null;
	}

	return date;
}

function initCP() {
	$('#person').val(
		$('#adults').val() + ' Adults; '
		 + $('#children').val() + ' Children; '
		 + $('#infants').val() + ' Infants');
}

function setCP(obj, id) {

	$('#' + id).val($(obj).val());
	initCP();

}

var appendMode = false;

function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
				"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getHash(str) {
	var re = /\/+/;
	var temp = str.split(re, 6);
	temp.splice(4, 1);
	if (temp.length != 5 && temp.length != 6) {
		return false;
	}
	return temp.join('_');
}

$(function () {

	$('#place_from, #place_to, #date_start').focus(function () {

		$(this).popover('dispose');

	});

	$("#place_from, #place_to").keyup(function () {
		$("#" + $(this).attr('id') + "_id").val();
	});

	$("#place_from").autocomplete({
		source: "/place-search/",
		minLength: 2,
		select: function (event, ui) {
			$("#place_from").val(ui.item.label);
			$("#place_from_id").val(ui.item.id);
		}
	});

	$("#place_to").autocomplete({
		source: "/place-search/",
		minLength: 2,
		select: function (event, ui) {
			$("#place_to").val(ui.item.label);
			$("#place_to_id").val(ui.item.id);
		}
	});

	var fromDate = $('#date_start').datepicker({
			"dateFormat": "dd.mm.yy",
			"altField": "#date_start_id",
			"altFormat": "yy-mm-dd",
			"minDate": new Date(),
			"showOtherMonths": true
		}).on("change", function () {
			toDate.datepicker("option", "minDate", getDate(this));
		});

	var toDate = $('#date_finish').datepicker({
			"dateFormat": "dd.mm.yy",
			"altField": "#date_finish_id",
			"altFormat": "yy-mm-dd",
			"minDate": new Date(),
			"showOtherMonths": true
		}).on("change", function () {
			fromDate.datepicker("option", "maxDate", getDate(this));
		});

	$('#person').focus(function () {

		$('#person').popover({
			container: 'body',
			content: $('#person_count').html(),
			placement: 'bottom',
			title: 'Passengers', 
			template: '<div class="popover " role="tooltip"><div class="arrow"></div><div class="popover-header ui-widget ui-widget-header ui-helper-clearfix ui-corner-all"></div><div class="popover-body"></div></div>',
			html: true
		})
	});

	$('#person').on('shown.bs.popover', function () {

		$('#person_count').remove();
		$('#adults_count').val($('#adults').val());
		$('#children_count').val($('#children').val());
		$('#infants_count').val($('#infants').val());

	});

});

function setFormParams(params) {
	if ($('#place_from_id').val() == '') {
		$('#place_from_id').val(params[0]);
	}
	if ($('#place_to_id').val() == '') {
		$('#place_to_id').val(params[1]);
	}
	if ($('#date_start_id').val() == '') {
		$('#date_start_id').val(params[2]);
	}
	if ($('#date_finish_id').val() == '') {
		$('#date_finish_id').val(params[3]);
	}
	if (params[4] == 1) {
		$('#direct_fly').prop('checked', true);
	}
	if ($('#class').val() == '') {
		$('#class').val(params[5]);
	}
	var p = params[6].split('+');
	$('#adults').val(p[0]);
	$('#adults_count').val(p[0]);
	$('#children').val(p[1]);
	$('#children_count').val(p[1]);
	$('#infants').val(p[2]);
	$('#infants_count').val(p[2]);

	if ($('#date_start').val() == '') {
		var start_date = params[2].split('-');
		$('#date_start').val(start_date[2] + '.' + start_date[1] + '.' + start_date[0]);
	}
	if ($('#date_finish').val() == '') {
		if (params[3] != '') {
			var finish_date = params[3].split('-');
			$('#date_finish').val(finish_date[2] + '.' + finish_date[1] + '.' + finish_date[0]);
		} else {
			$('#one_way').click();
		}
	}
	if ($('#place_from').val() == '') {
		$.get('/place-info/', {
			code: params[0]
		}, function (data) {
			$('#place_from').val(data)
		});
	}
	if ($('#place_to').val() == '') {
		$.get('/place-info/', {
			code: params[1]
		}, function (data) {
			$('#place_to').val(data)
		});
	}

	initCP();

}

function progress1() {
	$('.progress-line').css('width', '0%');
	$(".progress-line").animate({
		width: "+=100%",
	}, 12000, function () {
		progress1();
	});
}

function progress2() {
    $('#place_from').popover('hide');
	$('#place_to').popover('hide');
	$(".air-line").show();
	$(".air-line").css('width', '0%');
	$(".air-line").animate({
		width: "+=100%",
	}, 12000, function () {
		$(".air-line").fadeOut(400, function () {
			progress2();
		});
	});
}

function randomInteger(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1)
		rand = Math.round(rand);
	return rand;
}

var randonNameInterval;

function setProgress() {
	if ($("body").hasClass("stop-second-animation")) {
		return false;
	} else {
	$("body").addClass("stop-second-animation");
	$(".progress-line").stop();
	$('#airlinecount').html(APPVars.airlines.length);
	$(".air-line").stop();
	$('.progress-line').css('width', '0%');
	$('.progress-line').attr('style', '');
	$('#popular_destination').hide();
	$('.container-progress').show();
	$('.container-progress-flights').show();
	clearInterval(randonNameInterval);
	progress1();

	setTimeout(function () {
		progress2();
	}, 500);

	randonNameInterval = setInterval(function () {
			$('#airlinename').html(APPVars.airlines[randomInteger(0, APPVars.airlines.length - 1)]);
		}, 300);
	$("body").addClass("stop-second-animation");
	}
}

$(function () {

	$.get('/load-static-content/', {}, function (data) {

		$('#countryMenu').html(data.COUNTRIES);
		$('#currencyMenu').html(data.CURRENCY);
		$('#langMenu').html(data.LOCALES);

		$('#langMenu').find('a').click(function () {

			setLanguage($(this).attr('data-code'));
			return false;
		});

		$('#countryMenu').find('a').click(function () {

			setCountry($(this).attr('data-code'));
			return false;
		});

		$('#currencyMenu').find('a').click(function () {

			setCurrency($(this).attr('data-code'));
			return false;
		});

	}, 'json');

	$('#classMenu').find('a').click(function () {

		$('#class').val($(this).attr('data-code'));
		$(this).parents('ul').prev('span').html('<span  class="ui-selectmenu-icon ui-icon ui-icon-triangle-1-s"></span>' + $(this).text());
		$('.lang-menu').removeClass('open-menu');
		return false;
	});

	$('#one_way').click(function () {

		$('#date_finish').parent('.form-box').hide();
		$('#date_finish').val('');
		$('#date_finish_id').val('');

	});

	$('#round_trip').click(function () {

		$('#date_finish').parent('.form-box').show();

	});

	$(window).hashchange(function () {
		var hash = location.hash;
		$('.empty_block').remove();
		clearBlocks();

		ci = ci + 1;

		if (hash != '') {

			var session = '';
			if (appendMode && $('#session').length > 0) {
				session = $('#session').val();
			}

			var loadingHtml = '<div style="margin:15px;text-align:center;"><img  alt="" src="/templates/img/ajax-loader.gif" /><br /><br /><br /></div>';
			if (appendMode) {
				$('#load_more').html(loadingHtml);
			} else {
				if (!appendMode) {
					$('html, body').animate({
						scrollTop: $(".box-search").offset().top
					}, 500);

				}
			}

			//parse hash
			var params = hash.replace('#', '').split('/');
			setFormParams(params);
			$.post('/tickets-search/', {
				place1: params[0],
				place2: params[1],
				date1: params[2],
				date2: params[3],
				slocation: session,
				direct_flights: params[4],
				cabin: params[5],
				passengers: params[6],
				pageIndex: params[7],

			}, function (data) {

				if (appendMode === false) {
					setProgress();
				}

				$('#load_more').remove();

				var timer001 = setInterval(function () {
						$('.stop-info').map(function (index, el) {

							if (el.innerText.indexOf(',') != -1) {
								var text = el.innerHTML.replace("Stop:", "Stops:");
								el.innerHTML = text;
							}
						})
					}, 1000);

				if (typeof(data.error) != 'undefined') {

					$('#search_result')
					.html(data.error.error_html)
					.css('display', 'block');

					$('.container-progress').hide();
					$('.container-progress-flights').hide();
					$(".progress-line").stop();
					$(".air-line").stop();
					$('.progress-line').css('width', '0%');
					$('.air-line').css('width', '0%');

				} else if (typeof(data.items) != "undefined") {

					if (appendMode) {
						table = $('#table-result').DataTable();
						data['items']['data'].map(function (e) {
							table.row.add(e).draw();
						});
						//eval(data['action']);
					} else {

						if ($('#table-result').is() === false) {
							$('#search_result').html('')
							.append("<table id='table-result'></table>")
							.append('<input type="hidden" id="session" name="session" value="' + data.session + '" />');
						}

						table = $('#table-result').DataTable({
								'data': data['items']['data'],
								'columns': data['items']['columns'],
								"filter": false,
								"lengthChange": false,
								"ordering": false
							});

						table.on('page.dt', function () {
							$('html, body').animate({
								scrollTop: $(".dataTables_wrapper").offset().top
							}, 'slow');
						});

						table.column(0).visible(false);

						if (!data['action']) {
							//location.reload(true);
							//location.href = '/';
						}
						//eval(data['action']);

						if($("#booking_search:checked").length) {
							//document.location = "/redirect.php?url=" + data.booking_url;
							//window.open("/redirect.php?url=" + data.booking_url, "_blank");
						}

						$('#search_result').fadeIn();
					}
				}

				if (typeof(data.empty) != 'undefined') {

					$('#search_result').parent()
					.append(data.empty.empty_html)
					.css('display', 'block');
					$('.container-progress').hide();
					$('.container-progress-flights').hide();
					$(".progress-line").stop();
					$(".air-line").stop();
					$('.progress-line').css('width', '0%');
					$('.air-line').css('width', '0%');

				}
				$('.winfo').popover({
					container: 'body',
					placement: 'top',
					trigger: 'hover'
				});

				//if (data['items']['data'] == undefined || data['items']['data'] == '') {
					$('.container-progress').hide();
					$('.container-progress-flights').hide();
					$(".progress-line").stop();
					$(".air-line").stop();
					$('.progress-line').css('width', '0%');
					$('.air-line').css('width', '0%');
					clearInterval(timer001);
					document.cookie = "curentUrl=' '";
				//}

			}, 'json').fail(function() {
				doSearch(ci);
			});
		}
	})
	$(window).hashchange();

});

/* Hide form Passengers */ 
$(".form-search .form-box").on("click", function(){
	if ($(this).children("#person").length > 0) {
		return false;
	} 
	else {
		$('#person').popover('hide');
	}
});

/* Hide form Passengers on click*/ 
$(".form-search .form-box #person").on("click", function(){
	$(".form-search .form-box ul.lang-menu").removeClass("open-menu");	
});

/* Hide form Details */
$("body").on("click", "#booking_detail_modal .close, #booking_detail_modal .btn-secondary", function(){
	$('#booking_detail_modal').modal("hide");
});
