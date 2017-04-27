$('header nav li.sub, header nav li.sub *').on('touchend', function (e) { // Toggle sub nav on touch
	
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
	
	}
	
});
