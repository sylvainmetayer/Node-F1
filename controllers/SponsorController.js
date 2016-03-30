var model = require('./../models/sponsor.js');
var modelEcurie = require('./../models/ecurie.js');
var modelFinance = require('./../models/finance.js');
var async = require('async');

/* PARTIE CLIENT */
module.exports.getAllSponsors = function(request, response) {
  response.title = 'Liste des sponsors';

  model.getAllSponsors(function(erreur, resultat) {
    if (erreur) {
      console.log(err);
      return;
    }
    response.sponsors = resultat;
    response.render('admin/adminListerSponsors', response);
  });
};

/* PARTIE ADMIN */

module.exports.addForm = function(request, response) {
  response.title = 'Ajouter un sponsor';

  modelEcurie.getAllEcurie(function(erreur, resultat) {
    if (erreur) {
      console.log(erreur);
      return;
    }
    response.ecuries = resultat;
    response.render('admin/adminAddSponsor', response);
  })
};

module.exports.addData = function(request, response) {
  response.title = 'Ajouter un sponsor';


  var dataSponsor = {
    sponom:request.body.sponom,
    sposectactivite:request.body.sposectactivite
  };

  var sponumInserted;
  var dataEcurie = {
    ecunum:request.body.ecunum,
    sponum:sponumInserted
  }

  async.series([
      //on effectue d'abord l'ajout du sponsor, puis on ajoute son ecurie
      function(callback) {
        model.addSponsor(dataSponsor, function(err, resultat) {
          sponumInserted = resultat.insertId;

          callback(err, resultat);
        });
      },

      function(callback) {
        dataEcurie.sponum = sponumInserted;
        if (dataEcurie.ecunum != undefined && dataEcurie.ecunum != 'aucune') {
          //Si on a un id sur ecunum, on ajoute
          modelFinance.addFinance(dataEcurie, function(err, res) {
            callback(err, res);
            return;
          });
        } else {
          callback();
        }
      }
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      response.redirect("/admin/sponsors");
      return;
    }); //Fin async

};

module.exports.delete = function(req, res) {

  /* Dans l'ordre :
  - delete from sponsorise ;
  - delete from finance
  - delete from sponsor
  */
  var id = req.params.id;
  async.series([
      function(callback) {
        model.deleteSponsorise(id, function(erreur, resultat) {
          callback(erreur, resultat);
        });
      },
      function(callback) {
        modelFinance.deleteFinance(id, function(erreur, resultat) {
          callback(erreur, resultat);
        });
      },
      function(callback) {
        model.deleteSponsor(id, function(erreur, resultat) {
          callback(erreur, resultat);
        });
      },
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect("/admin/sponsors");
    }
  );
};
