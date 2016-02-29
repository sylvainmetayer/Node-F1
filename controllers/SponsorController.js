var model = require('./../models/sponsor.js');
var modelEcurie = require('./../models/ecurie.js');
var modelFinance = require('./../models/finance.js');
var async = require('async');

module.exports.getAllSponsors = function(request, response) {
  response.title = 'Liste des sponsors';

  model.getAllSponsors(function(erreur, resultat) {
    if (erreur) {
      console.log(err);
      return;
    }
    response.sponsors = resultat;
    console.log(response.sponsors);

    response.render('adminListerSponsors', response);
  });
};

module.exports.addForm = function(request, response) {
  response.title = 'Ajouter un sponsor';

  modelEcurie.getAllEcurie(function(erreur, resultat) {
    if (erreur) {
      console.log(erreur);
      return;
    }
    response.ecuries = resultat;
    response.render('adminAddSponsor', response);
  })
};

module.exports.addData = function(request, response) {
  response.title = 'Ajouter un sponsor';

  var sponum = request.body.sponum;
  var sposectactivite = request.body.sposectactivite;

  var dataSponsor = {
    sponum,
    sposectactivite
  };

  var sponumInserted;
  var ecunum = request.body.ecunum;
  var sponum = sponumInserted;
  var dataEcurie = {
    ecunum,
    sponum
  }

  async.series([
      //on effectue d'abord l'ajout du sponsor, puis on ajoute son ecurie
      function(callback) {
        model.addSponsor(function(err, resultat) {
          sponumInserted = resultat.insertId;
          console.log(sponumInserted);

          callback(err, resultat);
        });
      },

      function(callback) {
        modelFinance.addFinance(dataEcurie, function(err, res) {
          callback(err, res);
        });
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
