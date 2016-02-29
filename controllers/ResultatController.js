var model = require('./../models/resultat.js');
var async = require('async');

/* PARTIE CLIENT */

module.exports.GetResultat = function(request, response) {
  var idGP = request.params.id;
  response.title = "Détails d'un resultat";

  async.parallel([
      function(callback) {
        model.get(idGP, function(err, result) {
          callback(null, result)
        });
      }, //Fin callback 0
      function(callback) {
        model.getListResultat(function(erreur, resultat) {
          callback(erreur, resultat)
        });
      }, // fin callback 1
      function(callback) {
        model.getPiloteInGP(idGP, function(erreur, resultat) {
          callback(erreur, resultat)
        });
      }
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      //console.log(result);
      response.detailGP = result[0][0]; //Résultat première fonction.
      response.listeResultat = result[1]; //Résultat deuxième fonction.
      response.piloteByGP = result[2];
      console.log(response);
      response.render('listerResultat', response);
    }

  ); //Fin async
};

module.exports.ListerResultat = function(request, response) {
  response.title = 'Liste des resultats.';

  model.getListResultat(function(erreur, resultat) {
    if (erreur) {
      console.log(err);
      return;
    }
    response.listeResultat = resultat;
    console.log(response);

    response.render('listerResultat', response);
  });
};

/* PARTIE ADMIN */

module.exports.GetAllGPAdmin = function(request, response) {
  response.title = 'Liste des resultats.';

  model.getListResultat(function(erreur, resultat) {
    if (erreur) {
      console.log(err);
      return;
    }
    response.listeResultat = resultat;

    response.render('adminListerGP', response);
  });
};

module.exports.SaisieResultatsAdmin = function(request, response) {
  response.title = 'Saisir résultat grand prix';

  var gpnum = request.body.gpnum;
  console.log(gpnum);

  model.getSaisieResultat(gpnum, function(erreur, resultat) {
    if (erreur) {
      console.log(err);
      return;
    }
    response.resultats = resultat;
    console.log(response.resultats);
    response.render('adminSaisieResultatGP', response);
    // TODO finir la saisie des resultats, car c'est pas ça !
  });
};
