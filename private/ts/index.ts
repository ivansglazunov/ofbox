/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/jqueryui/jqueryui.d.ts" />
/// <reference path="typings/jquery.tooltipster/jquery.tooltipster.d.ts" />
/// <reference path="typings/socket.io-client/socket.io-client.d.ts" />
/// <reference path="typings/lodash/lodash.d.ts" />

if (typeof(io) !== 'undefined') var socket = io.connect();

import Head = require('Head');

((Head) => {
	var logo = new Head.Logo('.Logo', '.Head');
	
	logo.inMousedown();
	logo.outMousedown();
	logo.inHover();
	logo.open();
	logo.closeAfter(3000);
})(Head);

import Tooltips = require('Tooltips');
Tooltips.run();

import Mailer = require('Mailer');
Mailer.run(socket);

import Calculator = require('Calculator');