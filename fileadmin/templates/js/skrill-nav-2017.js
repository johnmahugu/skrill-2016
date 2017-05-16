// Realtime touch detection to support devices with both touch and mouse. http://www.javascriptkit.com/dhtmltutors/sticky-hover-issue-solutions.shtml

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

// Toggle sub nav on touch; removes the fallback checkboxes
$('header input[type=radio]').remove();
$('header nav li.sub, header nav li.sub *').on('touchend click', function (e) {
	
/* 	e.stopPropagation(); */
	if (!e.target.getAttribute('href') && $(this).hasClass('sub') || $(this).parent().hasClass('sub language')) {
	
		$(this).closest('.sub').toggleClass('open');
		return false;
	
	}

});

// Close menu when clicking/tapping outside
function closeFoldClickOutside(e) { 
	
	if (!e.target.closest('header')) {
		
		$('#toggle-menu')[0].checked = false;
		$('header .open').removeClass('open');
		
	}
	
}

$(window).on('click touchend', closeFoldClickOutside);

$(window).on('scroll', function (e) {

	if (window.scrollY > window.innerHeight) {
		
		$('body').addClass('scrolled');

	} else {
		
		$('body').removeClass('scrolled');

	}
	
});

$('#toggle-menu').on('change', function (e) {
	
	$('header').toggleClass('open');
	$('header').scrollTop(0);
	
});

function setHeaderVariables() {

	$('header')[0].style.setProperty('--viewport-height', window.innerHeight + 'px'); // for proper Safari iOS toolbar on/off layout, because it misreports vh units
	$('header nav li.sub:not(.language) ul').each( function (n) {
		
		$(this)[0].style.setProperty('--max-height', $(this)[0].scrollHeight + 'px'); // for height animation
		
	});
	$('main').css('padding-top', $('header').height() + 'px'); // Position content below the fixed header

}

$(window).on('resize', setHeaderVariables);
setHeaderVariables();

// @media media_type { ... } -> @media new_media_type { ... }
function setMediaQueryType (media_type, new_media_type) { 
	// bug: messes up the Safari inspector, but not others
	// Loop all stylesheets' CSS rules with type 4 (media query) matching the media_type parameter and update their cssText with new_media_type

	var sheet = 0;
	while (sheet < document.styleSheets.length) {
	
		var styles = document.styleSheets[sheet];
	
		var i = 0;
		while (i < styles.cssRules.length) {
			
			if (styles.cssRules[i].type === 4) {
				
				var new_media = styles.cssRules[i].cssText.replace(media_type, new_media_type); // to do: limit search to the type section, don't process the rules inside { } 
				styles.deleteRule(i);
				styles.insertRule(new_media, i);
	
			}
			
			i++;
			
		}
		
		sheet++;
	
	}
		
}

// Calculate required window width for unwrapped nav and set the breakpoint accordingly
function setBreakpoint() {
	
	var breakpoint = 901;
	$('header .middle').addClass('absolute');
	var middle_width = $('header .middle')[0].scrollWidth;
	$('header .middle').removeClass('absolute');
	var new_breakpoint = $('header .left')[0].scrollWidth + $('header .right')[0].scrollWidth + middle_width + 16;

	if (new_breakpoint > breakpoint) {

		setMediaQueryType ('width: ' + breakpoint + 'px)', 'width: ' +  new_breakpoint + 'px)');

	}

}

$(window).load(function() { // Executes when complete page is fully loaded, including all frames, objects and images. 

	setBreakpoint();

});

$(window).on('resize', setBreakpoint);
