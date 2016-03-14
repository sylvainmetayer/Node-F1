var model = require('../models/ecurie.js');
var modelSponsor = require('../models/sponsor.js')
var paysModel = require("../models/nationalite.js");

var async = require('async');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');
var path = require("path");

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

module.exports.addForm = function(request, response) {
  response.title = "Ajouter une écurie";
  // TODO Récupérer les données pour le formulaire
  paysModel.getAllNationnalites(function(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.pays = result;
    response.render('admin/addEcurie', response);
  });
}

module.exports.addData = function(request, response) {

  var form = new formidable.IncomingForm();

  form.parse(request, function(err, fields, files) {
    console.log(util.inspect({
      fields: fields,
      files: files
    }));
    var data = {
      ecunom: fields.ecunom,
      ecunomdir: fields.ecunomdir,
      fpnum: fields.fpnum,
      ecuadrsiege: fields.ecuadrsiege,
      ecupoints: fields.ecupoints,
      paynum: fields.paynum,
      ecuadresseimage: files.ecuadresseimage.name
    }
    console.log(data);
    model.add(data);
  });

  form.on('fileBegin', function(name, file) {
    file.path = path.join(__dirname, '../public/temp/') + file.name;
  });

  form.on('progress', function(bytesReceived, bytesExpected) {
    var percent_complete = (bytesReceived / bytesExpected) * 100;
    console.log(percent_complete.toFixed(2));
  });

  form.on('end', function(fields, files) {
    var temp_path = this.openedFiles[0].path;
    var file_name = this.openedFiles[0].name;
    var new_location = path.join(__dirname, '../public/image/ecurie/');
    fs.copy(temp_path, new_location + file_name, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("success!");
        fs.unlink(temp_path, function(err) {
          if (err) {
            console.error(err);
          } else {
            response.redirect('/admin/ecuries');
            return;
          }
        });
      }
    });
  });
}
