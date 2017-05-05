// Real time touch detection to support devices with both touch and mouse. http://www.javascriptkit.com/dhtmltutors/sticky-hover-issue-solutions.shtml

;(function(){

    var isTouch = false; //var to indicate current input type (is touch versus no touch) 
    var isTouchTimer;
    var curRootClass = ''; //var indicating current document root class ("can-touch" or "")

    function addtouchclass(e) {
// alert('touch');

        clearTimeout(isTouchTimer);
        isTouch = true;
        if (curRootClass != 'can-touch') { //add "can-touch' class if it's not already present

            curRootClass = 'can-touch';
            document.documentElement.classList.add(curRootClass);

        }

        isTouchTimer = setTimeout(function(){isTouch = false}, 500); //maintain "istouch" state for 500ms so removetouchclass doesn't get fired immediately following a touch event

    }
     
    function removetouchclass(e){
// alert('mouse');

        if (!isTouch && curRootClass === 'can-touch'){ //remove 'can-touch' class if not triggered by a touch event and class is present

            isTouch = false;
            curRootClass = '';
            document.documentElement.classList.remove('can-touch');

        }

    }
     
    $(window).on('mouseover', removetouchclass); //this event gets called when input type is everything from touch to mouse/ trackpad
    $(window).on('touchstart', addtouchclass); //this event only gets called when input type is touch

/*
	function pointerhandler(event) {
		alert(event);	
	    if (event.pointerType) {
	    
		    alert(event.pointerType);
	    
	    }
	
	}
*/
	    
//     $(window).on('touchstart', pointerhandler); //this event only gets called when input type is touch

})();


// Toggle sub nav on touch and remove the fallback checkboxes
$('header input[type=radio]').remove();
$('header nav li.sub, header nav li.sub *').on('touchend click', function (e) {
	
	e.stopPropagation();
	if ($(this).hasClass('sub') || $(this).parent().hasClass('sub language')) {
	
		$(this).closest('.sub').toggleClass('open');
		return false;
	
	}

});


function closeFoldClickOutside(e) { // Close menu when clicking/tapping outside
	
	if (!e.target.closest('header')) {
		
		$('#toggle-menu')[0].checked = false;
		$('header .open').removeClass('open');
		
	}
	
}

$(window).on('click touchend', closeFoldClickOutside);

/*
$(window).on('scroll', function (e) {
	
	if ($('#toggle-menu')[0].checked) {

		$('#toggle-menu')[0].checked = false;
		$('header').removeClass('open');
		$('header .language').removeClass('open');
		$('header').scrollTop(0);
	
	}
	
});
*/

$('#toggle-menu').on('change', function (e) {
	
	$('header').toggleClass('open');
	$('header').scrollTop(0);
	
});

function setHeaderVariables() {

	$('header')[0].style.setProperty('--viewport-height', window.innerHeight + 'px');
	$('header nav li.sub:not(.language) ul').each( function (n) {
		
		$(this)[0].style.setProperty('--max-height', $(this)[0].scrollHeight + 'px'); // for height animation
		
	});
	$('main').css('padding-top', $('header').height() + 'px');

}

$(window).on('resize', setHeaderVariables);
setHeaderVariables();
