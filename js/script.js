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
	if($(window).outerWidth() <= breakpoints.xsmall) {
		if($('#sidebar').hasClass('is-collapsed')) {
			$('#overlay').removeClass('is-visible');
		} else {
			$('#overlay').addClass('is-visible');
		}
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

function subNavClick() {
	$('.sub-nav-list').slideUp(0);

	$('.sub-nav').click(function(event) {
		if($('#sidebar').hasClass('is-collapsed')) {
			sidebarToggle();
			$(this).find('.sub-nav-list').slideDown();
		} else {
			if($(event.target).closest('.sub-nav-list').length == 0) {
				$(this).find('.sub-nav-list').slideToggle();
			}
		}
	});
}

function calendarClicks() {
	$('#month li').click(selectDay);
}

function clicksInit() {
	$('#sidebar-toggle').click(sidebarToggle);
	calendarClicks();
	documentClick();
	subNavClick();
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
	$('#sidebar').removeClass('disable-preload-transition');
});