/// <reference path="typings/jquery/jquery.d.ts" />
define(["require", "exports"], function (require, exports) {
    var Logo = (function () {
        function Logo(inSelector, outSelector) {
            this.inHoverNow = false;
            this.closed = true;
            this.in = $(inSelector);
            this.out = $(outSelector).not(inSelector);
        }
        Logo.prototype.open = function () {
            this.closed = false;
            this.in.addClass('opened');
            this.changeRightSide(2);
        };
        Logo.prototype.close = function () {
            this.closed = true;
            this.in.removeClass('opened');
            this.changeRightSide(1);
        };
        Logo.prototype.closeAfter = function (time) {
            var _this = this;
            this.stopClosingTimeout();
            this.timeout = setTimeout(function () {
                _this.close();
            }, time);
        };
        Logo.prototype.stopClosingTimeout = function () {
            clearTimeout(this.timeout);
        };
        Logo.prototype.toggle = function () {
            this.closed ? this.open() : this.close();
        };
        Logo.prototype.inMousedown = function () {
            var _this = this;
            this.in.mousedown(function () {
                _this.toggle();
            });
        };
        Logo.prototype.inHover = function () {
            var _this = this;
            this.in.hover(function () {
                _this.inHoverNow = true;
                if (!_this.closed)
                    _this.stopClosingTimeout();
            }, function () {
                _this.inHoverNow = false;
                if (!_this.closed)
                    _this.closeAfter(2000);
            });
        };
        Logo.prototype.outMousedown = function () {
            var _this = this;
            this.out.mousedown(function () {
                if (!_this.inHoverNow)
                    if (!_this.closed)
                        _this.close();
            });
        };
        Logo.prototype.changeRightSide = function (int) {
            $('.right > *').removeClass('active');
            $('.right > *:nth-child(' + int + ')').addClass('active');
        };
        return Logo;
    })();
    exports.Logo = Logo;
});
