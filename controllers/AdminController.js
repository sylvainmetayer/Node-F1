var model = require('../models/admin.js');
var async = require('async');
var sha1 = require('sha1');

module.exports.Login = function(request, response) {
  response.title = 'Authentification';
  response.render('login', response);
};

module.exports.Deconnexion = function(request, response) {
  var session = request.session;
  session.isConnected = undefined;
  response.render('home', response);
};

module.exports.CheckLogin = function(request, response) {
  response.title = 'Authentification en cours..';
  var login = request.body.login;
  var pwd = request.body.pwd;
  model.CheckLogin(login, sha1(pwd), function(err, res) {
    if (err) {
      console.log(err);
      return;
    }
    if (res == '') {
      //Login / pwd incorrect
      response.fail = "Login et/ou mot de passe incorrect.";
      response.render('login', response);
      return;
    } else {
      var session = request.session;
      session.isConnected = true;
      response.redirect("/admin");
    }
  });
};
