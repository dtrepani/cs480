"use strict";

var sidebarCollapsedWidthSmall = 0;

var sidebarWidths = {
	collapsedSmall: 44,
	collapsed: 54,
	expanded: 250,
}

var breakpoints = {
	xsmall:	570, // sidebar expanded width + minimum supported window width
	small:	768,
	medium:	960,
	large:	1200
};

var resizeDivs = function() {
	var sidebarWidth = getSidebarWidth();

	$('#content-wrapper').css('width', $(window).outerWidth() - sidebarWidth);
	$('#content').css({
		'margin-left': sidebarWidth,
		'min-height': $(window).outerHeight(),
	});
};

var sidebarToggle = function() {
	$('#sidebar').toggleClass('is-collapsed');

	if($('#sidebar').hasClass('is-collapsed')) {
		$('.sub-nav-list').slideUp();
	}

	toggleOverlay();
	resizeDivs();
};

var selectDay = function() {
	$('.calendar-view .is-selected').toggleClass('is-selected');
	$(this).toggleClass('is-selected');
};


function toggleOverlay() {
	if($('#sidebar').hasClass('is-collapsed')) {
		$('#overlay').removeClass('is-visible');
	} else if( !$('#sidebar').hasClass('is-collapsed') && $(window).outerWidth() <= breakpoints.xsmall ) {
		$('#overlay').addClass('is-visible');
	}
}

// sidebarCollapsedWidthSmall is used for xsmall widths. #content-wrapper on xsmall
// widths do not change their width to make room for the sidebar, but instead the
// sidebar overlays it.
function getSidebarWidth() {
	if($(window).outerWidth() <= breakpoints.xsmall) {
		return sidebarWidths.collapsedSmall;
	} else if(!$('#sidebar').hasClass('is-collapsed')) {
		return sidebarWidths.expanded;
	} else if($(window).outerWidth() > breakpoints.small) {
		return sidebarWidths.collapsed;
	}

	return sidebarWidths.collapsedSmall;
}

function collapseSidebarWhenClickedOutside(event) {
	if(	($(window).outerWidth() <= breakpoints.xsmall)
		&& ($(event.target).closest('#sidebar').length == 0)
		&& (!$('#sidebar').hasClass('is-collapsed')) ) {
		sidebarToggle();
	}
}

// Certain events such as collapsing an extended sidebar and deselecting days
// are triggered when clicking outside their areas.
function documentClick() {
	$(document).click(function(event) {
		if($(event.target).closest('.calendar-view').length == 0) {
			$('.calendar-view .is-selected').toggleClass('is-selected');
		}
		collapseSidebarWhenClickedOutside(event);
	});
}

function subNavClicks() {
	$('.sub-nav-list').slideUp(0);

	$('.sub-nav > div').click(function() {
		if($('#sidebar').hasClass('is-collapsed')) {
			sidebarToggle();
			$(this).siblings('.sub-nav-list').slideDown();
		} else {
			$(this).siblings('.sub-nav-list').slideToggle();
		}
	});

	$('.sub-nav-list li a').click(function() {
		$(this).children('[class*="square-icon-"]').toggleClass('disabled');
	});
}

function calendarClicks() {
	$('#month li').click(selectDay);
}

function clicksInit() {
	$('#sidebar-toggle').click(sidebarToggle);
	calendarClicks();
	documentClick();
	subNavClicks();
}

function sidebarInit() {
	if($(window).outerWidth() > breakpoints.small) {
		sidebarToggle();
	}
}

$(function() {
	sidebarInit();
	resizeDivs();
	clicksInit();
	$(window).resize(resizeDivs);
	$('.disable-preload-transition').removeClass('disable-preload-transition');
});