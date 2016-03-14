var circuitModel = require('../models/circuit.js');
var paysModel = require("../models/nationalite.js");
var courseModel = require("../models/course.js");
var grandprixModel = require("../models/grandprix.js");

var async = require('async');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');
var path = require("path");

module.exports.GetCircuit = function(request, response) {
  var id = request.params.id;
  response.title = 'Détails d\'un circuit';

  async.parallel([
      function(callback) {
        circuitModel.get(id, function(err, result) {
          callback(err, result)
        });
      }, //Fin callback 0
      function(callback) {
        circuitModel.getAllCircuits(function(err, result) {
          callback(err, result)
        });
      } // fin callback 1
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      response.circuit = result[0][0];
      response.circuits = result[1];
      response.render('listerCircuit', response);
    });
};

module.exports.ListerCircuit = function(request, response) {
  response.title = 'Liste des circuits';

  circuitModel.getAllCircuits(function(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.circuits = result;
    response.render('listerCircuit', response);
  });
};


/* PARTIE ADMIN */

module.exports.ListerCircuitAdmin = function(request, response) {
  response.title = 'Liste des circuits';

  circuitModel.getAllCircuitsAdmin(function(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.circuits = result;
    response.render('admin/adminListerCircuits', response);
  });
};

module.exports.delete = function(req, res) {

  /* Dans l'ordre :
  - delete from essais WHERE gpnum = ( SELECT gpnum FROM grandprix WHERE cirnum = 7);
  - delete from course WHERE gpnum = ( SELECT gpnum FROM grandprix WHERE cirnum = 7);
  - delete from grandprix WHERE cirnum = 7;
  - delete from circuit WHERE cirnum = 7;
  */
  var id = req.params.id;
  async.series([
      function(callback) {
        courseModel.deleteByCircuit(id, function(erreur, resultat) {
          callback(erreur, resultat);
        });
      },
      function(callback) {
        courseModel.deleteEssaisByCircuit(id, function(erreur, resultat) {
          callback(erreur, resultat);
        });
      },
      function(callback) {
        grandprixModel.deleteByCircuit(id, function(erreur, resultat) {
          callback(erreur, resultat);
        });
      },
      function(callback) {
        circuitModel.delete(id, function(erreur, resultat) {
          callback(erreur, resultat);
        });
      },
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect("/admin/circuits");
    }
  );
};

module.exports.add = function(request, response) {
  response.title = "Ajouter un circuit";

  paysModel.getAllNationnalites(function(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.pays = result;
    response.render('admin/addCircuit', response);
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
      cirnom: fields.cirnom,
      cirnbspectateurs: fields.cirnbspectateurs,
      paynum: fields.paynum,
      cirlongueur: fields.cirlongueur,
      cirtext: fields.cirtext,
      ciradresseimage: files.ciradresseimage.name
    }
    console.log(data);
    circuitModel.add(data);
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
    var new_location = path.join(__dirname, '../public/image/circuit/');
    fs.copy(temp_path, new_location + file_name, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("success!");
        fs.unlink(temp_path, function(err) {
          if (err) {
            console.error(err);
          } else {
            response.redirect('/admin/circuits');
            return;
          }
        });
      }
    });
  });
}
