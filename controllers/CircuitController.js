var circuitModel = require('../models/circuit.js');
var paysModel = require("../models/nationalite.js");

var async = require('async');
var formidable = require('formidable');
var util = require('util');
var fs   = require('fs-extra');
var path = require("path");

uploadFile = function(request) {

  console.log("COUCOU JE RENTRE POUR UPLOAD LE FICHIER");

  //console.log(request + " \n\nFILE : ENTREE");
  var form = new formidable.IncomingForm();

  form.parse(request, function (err, fields, files) {
      console.log("PARSE OK ? ");
      //console.log(util.inspect({fields: fields, files: files}));
      var data = {
        cirnom: fields.cirnom,
        cirnbspectateurs: fields.cirnbspectateurs,
        paynum: fields.paynum,
        cirlongueur : fields.cirlongueur,
        cirtext: fields.cirtext,
        ciradresseimage: "/public/upload/" + files.ciradresseimage.name
      }
      return data;
  });

  form.on('fileBegin', function(name, file) {
    console.log("COUCOU");
    file.path = path.join(__dirname, '../public/temp/') + file.name;
  });

  form.on('progress', function(bytesReceived, bytesExpected) {
    var percent_complete = (bytesReceived / bytesExpected) * 100;
    console.log(percent_complete.toFixed(2));
  });

  form.on('end', function (fields, files) {
      var temp_path = this.openedFiles[0].path;
      var file_name = this.openedFiles[0].name;
      var new_location = path.join(__dirname, '../public/upload/');
      fs.copy(temp_path, new_location + file_name, function (err) {
          if (err) {
              console.error(err);
          } else {
              console.log("success!");
              fs.unlink(temp_path, function(err) {
              if (err) {
                      console.error(err);
                      console.log("TROUBLE deletion temp !");
                      } else {
                        console.log("success deletion temp !");
                        return;
                      }
              });
          }
      });
    });
}

module.exports.ListerCircuit = function(request, response){
   response.title = 'Liste des circuits';

   circuitModel.getAllCircuits (function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
       response.circuits = result;
       response.render('listerCircuit', response);
        });
};

module.exports.ListerCircuitAdmin = function(request, response){
   response.title = 'Liste des circuits';

   circuitModel.getAllCircuitsAdmin (function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
       response.circuits = result;
       response.render('adminListerCircuits', response);
        });
};

module.exports.GetCircuit = function(request, response){
  var id = request.params.id;
  response.title = 'Détails d\'un circuit';

  async.parallel([
    function(callback){
        circuitModel.get (id, function (err, result) { callback(err, result)});
    }, //Fin callback 0
    function (callback) {
      circuitModel.getAllCircuits (function (err, result) { callback(err, result) });
    } // fin callback 1
  ],
  function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.circuit = result[0][0];
    response.circuits = result[1];
    response.render('listerCircuit', response);
  });
};

module.exports.add = function(request, response) {
  response.title = "Ajouter un circuit";

  paysModel.getAllNationnalites (function (err, result) {
       if (err) {
           console.log(err);
           return;
       }
      response.pays = result;
      response.render('addCircuit', response);
       });
}

module.exports.addData = function(request, response) {
  response.title = 'Liste circuits';

  //var data = uploadFile(request);
  //console.log(data);

  async.series([
    function(callback){
        circuitModel.getAllCircuitsAdmin(function(err, result) { callback(null, result) });
    },
    function(callback) {
      console.log(callback);
      var data = uploadFile(request, function(err, res) {callback(err, res)});
      console.log("JE RETURN DE LA !");
    },
    function (callback) {
      console.log(callback);
      circuitModel.add (data, function (erreur, resultat) { callback(erreur, resultat) });
    }
  ],
  function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("File upload & add OK");
    response.circuits = result[0];
    response.render('adminListerCircuits', response);
  });
}

module.exports.uploadGet = function(request, response) {
  response.render("upload");
}
