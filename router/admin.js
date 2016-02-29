var AdminController = require('../controllers/AdminController');
var HomeController = require('../controllers/HomeController');
var ResultatController = require('../controllers/ResultatController');
var EcurieController = require('../controllers/EcurieController');
var PiloteController = require('../controllers/PiloteController');
var CircuitController = require('../controllers/CircuitController');

var express = require('express');
var router = express.Router();

router.get('/', requireAdmin, HomeController.Index);

// TODO en phase de dev, on s'en fiche des requireAdmin. A remettre une fois que la fonctionnalité est testée et fonctionnelle.

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

router.route('/add/circuit')
  .get(CircuitController.add)
  .post(CircuitController.addData);

// TODO router.get('/circuits/:id', requireAdmin, CircuitController.delete);

// Résultats
router.route('/resultats')
  .get(ResultatController.GetAllGPAdmin)
  .post(ResultatController.SaisieResultatsAdmin);

function requireAdmin(req, res, next) {
  if (req.session.isConnected == "" || req.session.isConnected == undefined) {
    //console.log(res);
    //res.fail = "Accès retreint, merci de vous authentifier."
    // TODO fixer le res.fail lors de la redirection vers la page de login
    res.redirect('/login');
    return;
  }
  next();
}

module.exports = router;
