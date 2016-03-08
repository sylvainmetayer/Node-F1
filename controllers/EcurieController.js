var model = require('../models/ecurie.js');
var async = require('async');
var modelSponsor = require('../models/sponsor.js')

module.exports.ListerEcurie = function(request, response) {
  response.title = 'Liste des écuries';

  model.getListeEcurie(function(err, result) {
    if (err) {
      // gestion de l'erreur
      console.log(err);
      return;
    }
    response.listeEcurie = result;
    response.render('listerEcurie', response);
  });
};

module.exports.GetEcurie = function(request, response) {
  response.title = 'Details d\'une ecurie';
  var id = request.params.id;

  async.parallel([
      function(callback) {
        model.get(id, function(err, res) {
          callback(err, res)
        });
      }, //Fin callback 0
      function(callback) {
        model.getListeEcurie(function(err, result) {
          callback(err, result)
        });
      },
      function(callback) {
        model.getPilote(id, function(err, res) {
          callback(err, res)
        });
      },
      function(callback) {
        model.getVoiture(id, function(err, res) {
          callback(err, res)
        });
      },
      function(callback) {
        modelSponsor.getSponsorByEcurie(id, function(err, res) {
          callback(err, res);
        });
      }
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      response.ecurie = result[0][0]; //Résultat première fonction.
      response.listeEcurie = result[1]; //Résultat deuxième fonction.
      response.piloteEcurie = result[2];
      response.voitureEcurie = result[3];
      response.sponsors = result[4];
      console.log(response.sponsors);
      response.render('listerEcurie', response);
    }); //Fin async
};

/* PARTIE ADMIN */

module.exports.GetAllAEcurieAdmin = function(req, response) {
  response.title = "Admin - Liste des écuries";

  model.GetAllAEcurieAdmin(function(err, res) {
    if (err) {
      console.log(err);
      return;
    }
    response.ecuries = res;
    console.log(response.ecuries);
    response.render('admin/adminListerEcuries', response);
  });
}
