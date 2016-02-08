var model = require('../models/admin.js');
var async = require('async');

module.exports.Login = function(request, response){
	response.title = 'Authentification';
	response.render('login', response);
};

module.exports.CheckLogin = function(request, response){
	response.title = 'Authentification TEST';

	var login = request.body.login;
	var pwd = request.body.pwd;

	model.CheckLogin(login, pwd, function(err, res) {
		if (err) {
			console.log(err);
			return;
		}


		if (res == '') {
			console.log("TEST");
		}
		console.log(res);
		response.render('login', response);
	});


};
