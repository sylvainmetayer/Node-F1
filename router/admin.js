var AdminController = require('../controllers/AdminController');
var HomeController = require('../controllers/HomeController');
var ResultatController = require('../controllers/ResultatController');
var EcurieController = require('../controllers/EcurieController');
var PiloteController = require('../controllers/PiloteController');
var CircuitController = require('../controllers/CircuitController');
var SponsorController = require('../controllers/SponsorController');

var express = require('express');
var router = express.Router();

router.get('/', requireAdmin, HomeController.Index);

// Test upload image
router.route('/upload')
  .get(CircuitController.uploadGet)
  //.post(CircuitController.uploadFile);

/* GESTION DES PILOTES */

router.get('/pilotes', requireAdmin, PiloteController.ListerPiloteAdmin);
router.get("/pilotes/add", requireAdmin, PiloteController.addForm);
router.post("/pilotes/add", requireAdmin, PiloteController.addData);
router.get('/pilotes/delete/:id', requireAdmin, PiloteController.delete);

/* GESTION DES CIRCUITS */
router.get('/circuits', requireAdmin, CircuitController.ListerCircuitAdmin);

router.route('/circuits/add')
  .get(requireAdmin, CircuitController.add)
  .post(requireAdmin, CircuitController.addData);

// TODO router.get('/circuits/:id', requireAdmin, CircuitController.delete);

/* GESTION DES RESULTATS */
router.route('/resultats/')
  .get(requireAdmin, ResultatController.GetAllGPAdmin)
  .post(requireAdmin, ResultatController.SaisieResultatsAdmin);

/* GESTION DES SPONSORS */
router.route('/sponsors')
  .get(requireAdmin, SponsorController.getAllSponsors);

router.route('/sponsors/add')
  .get(requireAdmin, SponsorController.addForm)
  .post(requireAdmin, SponsorController.addData);


/* FONCTION CONTROLE CONNEXION */
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

//Export du router, pour pouvoir l'importer dans router.js
module.exports = router;
