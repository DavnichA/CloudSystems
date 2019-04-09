 

	function slowScroll (id) {
	var offset = 50;
	$('html, body').animate ({
		scrollTop: $(id).offset ().top - offset
	}, 800);
	$('.logo_navigation').toggleClass('logo_navigation_click');
	$('ul').toggleClass('toggle_active');
	return false;

};
