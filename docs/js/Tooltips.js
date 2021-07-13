/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/jqueryui/jqueryui.d.ts" />
/// <reference path="typings/jquery.tooltipster/jquery.tooltipster.d.ts" />
/// <reference path="typings/socket.io-client/socket.io-client.d.ts" />
define(["require", "exports"], function (require, exports) {
    function run() {
        $('.Services .Popover').each(function () {
            $('.Services .Service[data-popover-trigger=' + $(this).data('popover') + ']').tooltipster({
                speed: 100,
                contentAsHTML: true,
                content: $(this).html(),
                trigger: 'click',
                position: 'top',
                positionTracker: true,
                interactive: true,
                theme: 'tooltipster-Service',
                arrowColor: false,
                multiple: true,
                functionReady: function (origin, tooltip) {
                    $(tooltip).find('.Btn-Buy').click(function () {
                        $(origin).tooltipster('hide');
                    });
                }
            });
        });
        $('.Compare .left .price').each(function () {
            $(this).tooltipster({
                speed: 100,
                content: 'Примерная стоимость',
                trigger: 'hover',
                position: 'top',
                positionTracker: true,
                interactive: true,
                theme: 'tooltipster-Price',
                arrowColor: false
            });
        });
        $('.Compare .right .reason').each(function () {
            $(this).tooltipster({
                speed: 100,
                content: $(this).find('template').html(),
                trigger: 'click',
                position: 'right',
                positionTracker: true,
                interactive: true,
                theme: 'tooltipster-Reason',
                arrowColor: false
            });
        });
        $('.Compare .right .price').each(function () {
            $(this).tooltipster({
                speed: 100,
                content: 'Примерная сравнительная стоимость',
                trigger: 'hover',
                position: 'top',
                positionTracker: true,
                interactive: true,
                theme: 'tooltipster-Price',
                arrowColor: false
            });
        });
    }
    exports.run = run;
});
