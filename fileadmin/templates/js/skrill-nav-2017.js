$('header nav li.sub, header nav li.sub *').on('touchend click', function (e) { // Toggle sub nav on touch
	
	e.stopPropagation();
	if ($(this).hasClass('sub') || $(this).parent().hasClass('sub language')) {
	
		$(this).closest('.sub').toggleClass('open');
		return false;
	
	}

});

function closeFoldClickOutside(e) { // Close menu when clicking/tapping outside
	
	if (!e.target.closest('header')) {
		
		$('#toggle-menu')[0].checked = false;
		
	}
	
}

$(window).on('click touchend', closeFoldClickOutside);
$(window).on('scroll', function (e) {
	
	if ($('#toggle-menu')[0].checked) {

		$('#toggle-menu')[0].checked = false;
		$('header').removeClass('open');
		$('header .language').removeClass('open');
		$('header').scrollTop(0);
	
	}
	
});

$('#toggle-menu').on('change', function (e) {
	
	$('header').toggleClass('open');
	$('header').scrollTop(0);
	
});

function setHeaderVariables() {

	$('header')[0].style.setProperty('--height', window.innerHeight + 'px');
	$('header nav li.sub:not(.language) ul').each( function (n) {
		
		$(this)[0].style.setProperty('--max-height', $(this)[0].scrollHeight + 'px');
		
	});
	$('main').css('padding-top', $('header').height() + 'px');

}

$(window).on('resize', setHeaderVariables);
setHeaderVariables();
