var HomeController = require('./../controllers/HomeController');
var ResultatController = require('./../controllers/ResultatController');
var EcurieController = require('./../controllers/EcurieController');
var PiloteController = require('./../controllers/PiloteController');
var CircuitController = require('./../controllers/CircuitController');
var AdminController = require('../controllers/AdminController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);

// pilotes
    app.get('/repertoirePilote', PiloteController.Repertoire);
    app.get('/repertoirePilote/:lettre', PiloteController.RepertoireByLetter);
    app.get('/pilote/:pilote', PiloteController.GetPilote);

 // circuits
   app.get('/circuits', CircuitController.ListerCircuit);
   app.get('/circuits/:id', CircuitController.GetCircuit);

// Ecuries
   app.get('/ecuries', EcurieController.ListerEcurie);
   app.get('/ecuries/:id', EcurieController.GetEcurie);

 //Résultats
   app.get('/resultats', ResultatController.ListerResultat);
   app.get('/resultats/:id', ResultatController.GetResultat);

  //Toutes les routes concernant l'admin.
  var admin = require('./admin');
  app.use('/admin', admin);

  // Authentification
  app.get('/login',AdminController.Login);
  app.post('/login', AdminController.CheckLogin);

  // tout le reste
  app.get('*', HomeController.Index);
  app.post('*', HomeController.Index);

};
