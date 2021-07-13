/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/jqueryui/jqueryui.d.ts" />
/// <reference path="typings/socket.io-client/socket.io-client.d.ts" />
define(["require", "exports"], function (require, exports) {
    function run(socket) {
        $('.Mailer > form').on('submit', function () {
            var _this = this;
            if (!$(this).hasClass("disabled"))
                setTimeout(function () {
                    $(_this).find("input").trigger("blur");
                    if (!$('.Mailer .error').length) {
                        if (typeof (io) !== 'undefined')
                            socket.emit('sendmail', { 'data': $(_this).serializeArray() });
                        $(_this).addClass("disabled").find("input[type=submit]").addClass('done').val("Отправлено");
                        setTimeout(function () {
                            $(_this).find(":not(input[type=submit])").val("");
                            $(_this).removeClass("disabled").find("input[type=submit]").removeClass("done").val("Отправить");
                        }, 3000);
                    }
                    else {
                        $('.Mailer .error').effect("highlight");
                    }
                }, 0);
            return false;
        });
        $('.Mailer > form > input').on('blur', function () {
            var name = $(this).attr("name");
            if (name == "phone" || name == "email") {
                if (name == "phone")
                    var pattern = /^\s*(\+)?[0-9 \-\(\)]{5,25}(\d|\))\s*$/;
                else if (name == "email")
                    var pattern = /^\s*[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*([a-z]{2,6})\s*$/;
                if (!pattern.test(this.value)) {
                    $(this).addClass('error');
                }
                else {
                    $(this).removeClass('error');
                }
                this.value = $.trim(this.value);
            }
        });
    }
    exports.run = run;
});
