var piloteModel = require('../models/pilote.js');
var sponsorModel = require('../models/sponsor.js');
var photoModel = require('../models/photo.js');
var ecurieModel = require('../models/ecurie.js');
var async = require('async');

module.exports.Repertoire = function(request, response) {
   response.title = 'Répertoire des pilotes';

   piloteModel.getListPilotes (function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
       response.lettrePilote = result;
       //console.log("RESULTAT : " +result);
       response.render('repertoirePilotes', response);
        });
  } ;

  /**
  Permet de retourner les pilotes, selon la premiere lettre de leur nom
  */
  module.exports.RepertoireByLetter = function(request, response) {
    var lettre = request.params.lettre;
    response.title = 'Liste des pilotes';

//TODO Bug fix
    async.parallel([
      function(callback){
          piloteModel.getPiloteByLetter(lettre, function(err, resultat) { callback(null, resultat)});
      }, //Fin callback 0
      function (callback) {
        piloteModel.getListPilotes (function (erreur, resultat) { callback(null, resultat)});
      } // fin callback 1
    ],
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      response.listePilote = result[0]; //Résultat première fonction.
      response.lettrePilote = result[1]; //Résultat deuxième fonction.
      //console.log(response);
      response.render('repertoirePilotes', response);
    }); //Fin async
  } ;

  module.exports.GetPilote = function(request, response) {
    var pilote = request.params.pilote;
    response.title = "Détails d'un pilote";

    async.parallel([
      function(callback){
          piloteModel.getPilote(pilote, function(err, result) { callback(null, result) });
      }, //Fin callback 0
      function (callback) {
        piloteModel.getListPilotes (function (erreur, resultat) { callback(erreur, resultat) });
      }, // fin callback 1
      function (callback) {
        sponsorModel.getSponsorsByPilote (pilote, function (erreur, resultat) { callback(erreur, resultat) });
      },
      function(callback) {
        photoModel.getPhotosByPilote( pilote, function(err, res) { callback( err, res)});
      },
      function(callback) {
        ecurieModel.getEcurie(pilote, function(err,res) {callback(err, res)});
      }
    ],
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      //console.log(result);
      response.pilote = result[0][0]; //Résultat première fonction.
      response.lettrePilote = result[1]; //Résultat deuxième fonction.
      response.sponsors = result[2];
      response.listePhotosPilote = result[3];
      response.ecuriePilote = result[4][0];
      console.log(response);
      response.render('repertoirePilotes', response);
    }

    ); //Fin async

  };
