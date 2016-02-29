var model = require('../models/ecurie.js');
var async = require('async');

/*
<!--
* listeEcurie contient par exemple :
* [
* { ecunum: 5, payadrdrap: 'AAA',ecunom:'rrr' },
* { ecunum: 6, payadrdrap: 'BAA' ,ecunom:'ggg'},
* { ecunum: 7, payadrdrap: 'ACA' ,ecunom:'kkkk'}
*  ]
*
* response.title est passé à main.handlebars via la vue ListerEcurie
* il sera inclus dans cette balise : <title> {{title}}</title>
*/

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
      console.log(response);
      response.render('listerEcurie', response);
    }); //Fin async
};
