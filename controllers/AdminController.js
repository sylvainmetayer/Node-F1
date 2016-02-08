var modelAdmin = require('../models/admin.js');
var async = require('async');

module.exports.Login = function(request, response){
	response.title = 'Authentification';
	response.render('listerResultat', response);
};
