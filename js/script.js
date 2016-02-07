"use strict";

var windowWidth = 0,
	sidebarCollapsedWidthSmall = 0;

var breakpoints = {
	xsmall: 570, // sidebar expanded width + minimum supported window width
	small: 768,
	medium: 960,
	large: 1200,
};

var resizeDivs = function() {
	var sidebarWidth = getWidths();

	$('#content-wrapper').css('width', windowWidth - sidebarWidth);
	$('#content').css('margin-left', sidebarWidth);
	$('#content').css('min-height', $(window).outerHeight());
	$('#header-sidebar').css('width', $('#sidebar').outerWidth());
};

var sidebarToggle = function() {
	$('#sidebar').toggleClass('is-collapsed');
	resizeDivs();
};

// sidebarCollapsedWidthSmall is used for xsmall widths. #content-wrapper on xsmall
// widths do not change their width to make room for the sidebar, but instead the
// sidebar overlays it.
function getWidths() {
	windowWidth = $(window).outerWidth();

	if(sidebarCollapsedWidthSmall == 0 && windowWidth <= breakpoints.xsmall) {
		sidebarCollapsedWidthSmall = $('#sidebar').outerWidth();
	}

	return (windowWidth > breakpoints.xsmall) ? $('#sidebar').outerWidth() : sidebarCollapsedWidthSmall;
}

function sidebarClick() {
	$('#sidebar-toggle').click(sidebarToggle);
}

//
function sidebarInit() {
	if($(window).outerWidth() > breakpoints.small) {
		sidebarToggle();
	}
}

$(function() {
	sidebarInit();
	resizeDivs();
	sidebarClick();
	$(window).resize(resizeDivs);
});