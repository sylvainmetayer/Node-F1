var circuitModel = require('../models/circuit.js');
var async = require('async');
// ////////////////////// L I S T E R     C I R C U I T S

module.exports.ListerCircuit = function(request, response){
   response.title = 'Liste des circuits';

   circuitModel.getAllCircuits (function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
       response.circuits = result;
       //console.log(result);
       response.render('listerCircuit', response);
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
    //console.log(response);
    response.render('listerCircuit', response);
  });
};
