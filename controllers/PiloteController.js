var model = require('../models/pilote.js');

module.exports.Repertoire = function(request, response) {
   response.title = 'Répertoire des pilotes';

   console.log("Méthode Repertoire.");
   model.getListPilotes (function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
       response.lettrePilote = result;
       console.log("RESULTAT : " +result);
       response.render('repertoirePilotes', response);
        });
  } ;

  /**
  Permet de retourner les pilotes, selon la premiere lettre de leur nom
  */
  module.exports.listByLetter = function(request, response) {
    var lettre = request.params.lettre;
    response.title = 'Liste des pilotes';

    model.getPiloteByLetter (lettre, function ( err, result) {
        if (err) {
            console.log(err);
            return;
        }
       response.listePilote = result;
       model.getListPilotes (function (erreur, resultat) {
         if (erreur) {
           console.log(erreur);
           return;
         }
         response.lettrePilote = resultat;
         console.log(response);
         response.render('repertoirePilotes', response);
       })

        });
  } ;
