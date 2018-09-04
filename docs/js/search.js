(function ($) {	

	$.fn.searchBox = function(ev) {

		var $searchEl = $('.search-elem');
		var $placeHolder = $('.placeholder');
		var $sField = $('#search-field');

		if ( ev === "open") {
			$searchEl.addClass('search-open')
		};

		if ( ev === 'close') {
			$searchEl.removeClass('search-open'),
			$placeHolder.removeClass('move-up'),
			$sField.val(''); 
		};

		var moveText = function() {
			$placeHolder.addClass('move-up');
		}

		$sField.focus(moveText);
		$placeHolder.on('click', moveText);
		
		$('.submit').prop('disabled', true);
		$('#search-field').keyup(function() {
	        if($(this).val() != '') {
	           $('.submit').prop('disabled', false);
	        }
	    });
	}	

}(jQuery));

$('.search-btn').on('click', function(e) {
	$(this).searchBox('open');
	
	
	searchboxOpen = "Yes"
	
	document.getElementById("dom-body").style.overflowY = "hidden"
document.getElementById("mynavbar").className =""
	e.preventDefault();
});

$('.close').on('click', function() {

	document.getElementById("dom-body").style.overflowY = ""

	//Stop removing fixed navbar
	searchboxOpen = "NO"
	fixnavbar()
	
	$(this).searchBox('close');
});