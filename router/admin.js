var AdminController = require('../controllers/AdminController');
var HomeController = require('../controllers/HomeController');
var ResultatController = require('../controllers/ResultatController');
var EcurieController = require('../controllers/EcurieController');
var PiloteController = require('../controllers/PiloteController');
var CircuitController = require('../controllers/CircuitController');

var express = require('express');
var router = express.Router();

router.get('/', requireAdmin, HomeController.Index);

// Test upload image

router.route('/upload')
  .get(CircuitController.uploadGet)
  //.post(CircuitController.uploadFile);


// Pilote
router.route('/repertoirePilote')
.get(requireAdmin, PiloteController.ListerPiloteAdmin);

router.get('/repertoirePilote/:id', requireAdmin, PiloteController.delete);

router.route('/add/pilote')
  .get(requireAdmin, PiloteController.add)
  .post(requireAdmin, PiloteController.addData);

// Circuits
router.get('/circuits', requireAdmin, CircuitController.ListerCircuitAdmin);

router.route('/add/circuit') // TODO remettre les requireAdmin
  .get(CircuitController.add)
  .post(CircuitController.addData);

// TODO router.get('/circuits/:id', requireAdmin, CircuitController.delete);


function requireAdmin(req, res, next) {
  if (req.session.isConnected == "" || req.session.isConnected == undefined) {
    message = "{'fail':'Merci de vous authentifier'}";

    //TODO modifier afin de gérer l'envoi d'un message personnalisé.
    res.fail = JSON.stringify({ fail: "Merci de vous authentifier" });
    res.redirect('/login');
    console.log(res);
    return;
  }
  next();
}

module.exports = router;
