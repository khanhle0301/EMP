$(".call-me-back-anchor").click(function () {
	if (!$(this).next(".call-me-back-menu").hasClass("in")) {
		$(this).next(".call-me-back-menu").removeClass("slideDownReverse").addClass("slideDown in").css("display", "block").find("input.name").trigger("focus")
	} else {
		$(this).next(".call-me-back-menu").removeClass("slideDown in").addClass("slideDownReverse").fadeOut()
	}
});
$('.popover-term').popover();
var callBackMenuisHover = false;
$(".call-me-back-menu,.call-me-back-anchor").hover(function () {
	callBackMenuisHover = true
}, function () {
	callBackMenuisHover = false
});
$(document).click(function () {
	if (callBackMenuisHover == false) {
		$(".call-me-back-menu").removeClass("slideDown in").addClass("slideDownReverse").fadeOut()
	}
});
var $location = $(".location");
$location.each(function () {
	$(this).autocomplete({source: header.cityNames, appendTo: $(this).next(), minLength: 0});
	$(this).on("click", function () {
		$(this).autocomplete("search", "")
	})
});
$(document).on("click", ".ui-menu-item", function (e) {
	var t = $(this);
	t.parents(".location-list").prev("input").val(t.text());
	t.parent().fadeOut("fast")
});
var $header = $("#head-text");
var $caption = $("#caption-text");
$(function () {
	$header.fadeTo("slow", 1);
	setTimeout(function () {
		$caption.fadeTo("slow", 1)
	}, 400);
	setTimeout(function () {
		$(".phone-number,.user-account").fadeTo("slow", 1)
	}, 800);
	setTimeout(function () {
		$(".box").fadeTo("slow", 1)
	}, 800);
	setTimeout(function () {
		$("#why-vietnamworks").fadeTo("slow", 1)
	}, 1200);
	setTimeout(function () {
		$("#testimonial").fadeTo("slow", 1)
	}, 1600)
});
setTimeout(function () {
	$(".parallax-layer").parallax({mouseport: $(".parallax-viewport")});
	$("#testimonial").fadeTo("slow", 1)
}, 800);
$(".btn").hover(function () {
	var e = $(this);
	e.find(".pie-timer-wrapper").addClass("pie-timer-wrapper-alert");
	setTimeout(function () {
		e.find(".circle").show();
		e.find(".pie-timer-wrapper").removeClass("pie-timer-wrapper-alert")
	}, 500)
}, function () {
	$(this).find(".pie-timer-wrapper").fadeOut("normal").promise().done(function () {
		$(this).removeClass("pie-timer-wrapper-alert").fadeIn("fast")
	});
	$(this).find(".circle").fadeOut("fast")
});

// Top Banner
$(function () {
	setTimeout(function () {
		if (!getCookie('doNotShowTopBanner')) {
			var $jsTopBanner = $('.js-top-banner');
			$jsTopBanner.slideDown('fast').find('.close').click(function (e) {
				e.stopPropagation();
				setCookie('doNotShowTopBanner', true, 7);
				$(this).closest('.js-top-banner').stop().slideUp('fast');

			});

			// $jsTopBanner.click(function () {
			// 	$(this).find("a").simulate("click")
			// });
		}
	}, 500)
});

// Check footer app badges, if there is no URL, the cursor should be default
var checkFooterBadgeHREF = function() {
    "use strict";
    $('.footer__app-badges').find('a').each(function() {
        if (!$(this).attr('href')) {
            $(this).addClass('non-clickable').removeAttr('href target');
        }
    })
};

$(function() {
    "use strict";
    checkFooterBadgeHREF();
});