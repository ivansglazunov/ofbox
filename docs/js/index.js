/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/jqueryui/jqueryui.d.ts" />
/// <reference path="typings/jquery.tooltipster/jquery.tooltipster.d.ts" />
/// <reference path="typings/socket.io-client/socket.io-client.d.ts" />
/// <reference path="typings/lodash/lodash.d.ts" />
define(["require", "exports", 'Head', 'Tooltips', 'Mailer'], function (require, exports, Head, Tooltips, Mailer) {
    if (typeof (io) !== 'undefined')
        var socket = io.connect();
    (function (Head) {
        var logo = new Head.Logo('.Logo', '.Head');
        logo.inMousedown();
        logo.outMousedown();
        logo.inHover();
        logo.open();
        logo.closeAfter(3000);
    })(Head);
    Tooltips.run();
    Mailer.run(socket);
});
