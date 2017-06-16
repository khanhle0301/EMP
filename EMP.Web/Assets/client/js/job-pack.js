$('.pack-wrapper').hover(function () {
    if (!$(this).hasClass('chosen')) {
        $(this).stop(true, true).switchClass('', 'active', 100);
    }
}, function () {
    if (!$(this).hasClass('chosen')) {
        $(this).stop(true, true).switchClass('active', '', 100);
    }
});
$('.job-pack #pay .payment-method .offline a').click(function () {
    if ($(this).parent().hasClass('hover')) {
        $(this).parent().removeClass('hover');
        $('.job-pack #pay .offline-payment').slideToggle('fast');
    } else {
        $(this).parent().addClass('hover');
        $('.job-pack #pay .offline-payment').slideToggle('fast');
    }
});
$('.job-pack #pay .payment-method .method a').click(function () {
    if ($(this).parent().hasClass('offline') === false) {
        $('.job-pack #pay .offline-payment').slideUp('fast');
        $('.job-pack #pay .payment-method .offline').removeClass('hover');
    }
});
$('.job-pack #pay .icon-del').live('click', function () {
    $(this).switchClass('icon-del', 'icon-undo', 100);
    $(this).parents('tr').addClass('removeService').css({"text-decoration": "line-through", "color": "#999999"});
    $(this).parents('tr').find('select').val(0);
});
$('.job-pack #pay .icon-undo').live('click', function () {
    $(this).switchClass('icon-undo', 'icon-del', 100);
    $(this).parents('tr').removeClass('removeService').css({'text-decoration': 'none', 'color': '#333'});
    $(this).parents('tr').find('select').val(1);
});
$('.job-pack #pay .atm-card .others').hover(function () {
    $('.atm-card .logos .banks').stop(true, false).slideToggle('fast');
}, function () {
    $('.atm-card .logos .banks').stop(true, false).slideToggle('fast');
});
$('.dif-add').click(function () {
    $('.different-address').slideToggle('fast');
});
$('.job-pack #premium-option .option-boxes .box').hover(function () {
    $(this).switchClass('', 'hover', 200);
}, function () {
    $(this).switchClass('hover', '', 200);
});
(function ($) {
    var usesTween = !!$.Tween;
    if (usesTween) {
        $.Tween.propHooks['backgroundPosition'] = {get: function (tween) {
            return parseBackgroundPosition($(tween.elem).css(tween.prop));
        }, set: setBackgroundPosition};
    } else {
        $.fx.step['backgroundPosition'] = setBackgroundPosition;
    }
    function parseBackgroundPosition(value) {
        var bgPos = (value || '').split(/ /);
        var presets = {center: '50%', left: '0%', right: '100%', top: '0%', bottom: '100%'};
        var decodePos = function (index) {
            var pos = (presets[bgPos[index]] || bgPos[index] || '50%').match(/^([+-]=)?([+-]?\d+(\.\d*)?)(.*)$/);
            bgPos[index] = [pos[1], parseFloat(pos[2]), pos[4] || 'px'];
        };
        if (bgPos.length == 1 && $.inArray(bgPos[0], ['top', 'bottom']) > -1) {
            bgPos[1] = bgPos[0];
            bgPos[0] = '50%';
        }
        decodePos(0);
        decodePos(1);
        return bgPos;
    }

    function setBackgroundPosition(tween) {
        if (!tween.set) {
            initBackgroundPosition(tween);
        }
        $(tween.elem).css('background-position', ((tween.pos * (tween.end[0][1] - tween.start[0][1]) + tween.start[0][1]) + tween.end[0][2]) + ' ' + ((tween.pos * (tween.end[1][1] - tween.start[1][1]) + tween.start[1][1]) + tween.end[1][2]));
    }

    function initBackgroundPosition(tween) {
        tween.start = parseBackgroundPosition($(tween.elem).css('backgroundPosition'));
        tween.end = parseBackgroundPosition(tween.end);
        for (var i = 0; i < tween.end.length; i++) {
            if (tween.end[i][0]) {
                tween.end[i][1] = tween.start[i][1] + (tween.end[i][0] == '-=' ? -1 : +1) * tween.end[i][1];
            }
        }
        tween.set = true;
    }
})(jQuery);

$('#pay .top-level, #pay .top-job, #pay .bold-red, #pay .refresh-job, #pay .refresh-job-weekly, #pay .featured-job, #pay .description-wrapper').hover(function () {
    $(this).find('.description').stop(true, true).fadeIn('fast');
}, function () {
    $(this).find('.description').stop(true, true).fadeOut('fast');
});

$(function () {
    if ($.browser.msie) {
        var zIndexNumber = 1000;
        $("#pay table.panel *").each(function () {
            $(this).css('zIndex', zIndexNumber);
            zIndexNumber -= 1;
        });
    }
});
function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number, prec = !isFinite(+decimals) ? 0 : Math.abs(decimals), sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, dec = (typeof dec_point === 'undefined') ? '.' : dec_point, s = '', toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return'' + Math.round(n * k) / k;
    };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
var isRecalRunning = false;
var isRecalDiscountRateRunning = false;
function recal() {
    var mode = $('#order_mode').val();
    if (mode == 'Single') {
        recalculatePriceSingleMode();
    } else if (mode == 'JobPack') {
        recalculatePriceJobPackMode();
    }
}

function recalculatePriceSingleMode() {
    if (isRecalRunning === false) {
        setTimeout(function () {
            isRecalRunning = true;
            var resumeView = $('#cmbResumeSearch'),
                data;
            var items = {};
            $.each($('input[name^=item_qty_]'), function() {
                var item_id = $(this).attr('name').substring('item_qty_'.length);
                items[item_id] = $(this).val();
            });
            data = { action: 'ReCalculate',
                resumeViewQty: resumeView.length > 0 ? resumeView.val() : 0,
                items: JSON.stringify(items)
            };
            $.ajax({type: 'POST', data: data, async: false, url: 'onlinePaymentSummary.php', dataType: 'json', success: function (data) {
                for (var key in data) {
                    if (data[key].hasOwnProperty('price')) {
                        $('#item-price-'+key).html(number_format(data[key].price));
                        $('#item-vat-'+key).html(number_format(data[key].vat));
                        $('#item-total-'+key).html(number_format(data[key].total));
                    } else {
                        $('#' + key).html(number_format(data[key]));
                    }
                }
            }, complete: function () {
                isRecalRunning = false;
            }});
        }, 0);
    }
}

function recalculatePriceJobPackMode() {
    if (isRecalRunning === false) {
        setTimeout(function () {
            isRecalRunning = true;
            var packQty = $('#cmbPack'),
                boldRed = $('#boldRed-noPack'),
                topLevel = $('#topLevel-noPack'),
                topJob = $('#topJob-noPack'),
                refreshJob = $('#refreshJob-noPack'),
                refreshJobWeekly = $('#refreshJobWeekly-noPack'),
                featuredJob = $('#featuredJob-noPack'),
                resumeView = $('#cmbResumeSearch'),
                data;

            data = { action: 'ReCalculate',
                packQty: packQty.val(),
                boldRed: (boldRed.length > 0 && boldRed.parents('tr.removeService').length == 0) ? 1 : 0,
                topLevel: (topLevel.length > 0 && topLevel.parents('tr.removeService').length == 0) ? 1 : 0,
                topJob: (topJob.length > 0 && topJob.parents('tr.removeService').length == 0) ? 1 : 0,
                featuredJob: (featuredJob.length > 0 && featuredJob.parents('tr.removeService').length == 0) ? 1 : 0,
                refreshJob: (refreshJob.length > 0 && refreshJob.parents('tr.removeService').length == 0) ? 1 : 0,
                refreshJobWeekly: (refreshJobWeekly.length > 0 && refreshJobWeekly.parents('tr.removeService').length == 0) ? 1 : 0,
                resumeView: (resumeView.length > 0 && resumeView.parents('tr.removeService').length == 0) ? 1 : 0,
                resumeViewQty: resumeView.length > 0 ? resumeView.val() : 0
            };
            $.ajax({type: 'POST', data: data, async: false, url: 'onlinePaymentSummary.php', dataType: 'json', success: function (data) {
                for (var key in data) {
                    if (data[key].price) {
                        $('#' + key + '-price').html(number_format(data[key].price));
                        $('#' + key + '-vat').html(number_format(data[key].vat));
                        $('#' + key + '-total').html(number_format(data[key].total));
                    } else {
                        $('#' + key).html(number_format(data[key]));
                    }
                }
            }, complete: function () {
                isRecalRunning = false;
            }});
        }, 0);
    }
}
function recalDiscountRate(me) {
    var data, qty = $(me).val(), isAppliedDiscount = $(me).attr('data');
    if (isAppliedDiscount == 1 && isRecalDiscountRateRunning === false && qty >=0 ) {
        setTimeout(function () {
            isRecalDiscountRateRunning = true;
            data = { action: 'ReCalculateDiscountRate',
                     qty: qty
                    };
            $.ajax({type: 'POST', data: data, async: false, url: 'onlinePaymentSummary.php', dataType: 'json', success: function (data) {
                $(me).next().find('.rate').text(data.rate);
            }, complete: function () {
                isRecalDiscountRateRunning = false;
            }});
        }, 0);
    }
}


$('#order-confirm .icon-question').hover(function () {
    $('.different-add-hint').stop(true, false).fadeIn('fast');
}, function () {
    $('.different-add-hint').stop(true, false).fadeOut('fast');
})
$(document).on("mouseenter", ".how-it-work", function () {
    $(".how-it-work-bubble").stop(true, true).fadeIn("fast")
});
$(document).on("mouseleave", ".how-it-work", function () {
    $(".how-it-work-bubble").fadeOut("fast");
})