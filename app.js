var _ = require('lodash');
var logger = require('morgan');
var express = require('express');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(logger());
app.use('/', express.static(__dirname + '/docs'));

server.listen(process.env.PORT || 80);

io.on('connection', function (socket) {
	
	socket.on('sendmail', function (data) {
		
		data = data.data;
		
		var form = {};
		for (var i = 0; i < data.length; i++) {
			if(!_.isEmpty(data[i].value))
				form[data[i].name] = data[i].value;
		}
		form = _.defaults(form, { 'name': 'Не указано', 'phone': 'Не указан', 'email': 'Не указан', 'message': 'Не указано' });
		
		console.dir(form);
		
		/*
		var transporter = nodemailer.createTransport({
		    service: 'Gmail',
		    secure: true,
		    auth: {
		        user: 'opensourcewebstandards@gmail.com',
		        pass: 'Osws7499Google'
		    }
		});
		*/
		
		/*
		var transporter = nodemailer.createTransport(smtpTransport({
		    host: 'smtp.ofbox.ru',
		    port: 25,
		    auth: {
		        user: 'mail',
		        pass: 'mail'
		    },
		    connectionTimeout: 30000,
			greetingTimeout: 30000,
			socketTimeout: 30000,
		}));
		*/
	
		var transporter = nodemailer.createTransport(smtpTransport({
		    host: 'smtp.gmail.com',
		    port: 465,
		    secure: true,
		    auth: {
		        user: 'opensourcewebstandards@gmail.com',
		        pass: 'Osws7499Google'
		    }
		}));
		
		//var transporter = nodemailer.createTransport();
		
		var message = "\t" + form.message.replace(/(\r?\n)/g, "$1\t"); ;
		
		delete form.message;

		transporter.sendMail({
		    from: 'opensourcewebstandards@gmail.com',
		    //from: 'mail@ofbox.ru',
		    to: 'konard@me.com',
		    subject: 'Регистрация на сайте ofbox',
		    text: "Здравствуйте,\n\n" + JSON.stringify(form, null, 2) + "\n\nСообщение:\n\n" + message + "\n\nС уважением,\nкоманда ofbox."
		}, function(error, info){
		    if(error){
		        console.log(error);
		    }else{
		        console.log('Message sent: ' + info.response);
		    }
		});
	});
});

process.stdin.on("data", process.exit);