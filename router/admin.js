var AdminController = require('../controllers/AdminController');
var HomeController = require('../controllers/HomeController');
var ResultatController = require('../controllers/ResultatController');
var EcurieController = require('../controllers/EcurieController');
var PiloteController = require('../controllers/PiloteController');
var CircuitController = require('../controllers/CircuitController');
var SponsorController = require('../controllers/SponsorController');

/*
SYNTAXE DES ROUTES
/xxx/add : ajout
/xxx/update : maj
/xxx/delete : supprimer
/xxx/:id : details
*/

var express = require('express');
var router = express.Router();

router.get('/', requireAdmin, HomeController.Index);

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

router.get('/circuits/delete/:id', requireAdmin, CircuitController.delete);

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

/* GESTION DES ECURIES */
router.get('/ecuries', requireAdmin, EcurieController.GetAllAEcurieAdmin);
router.route("/ecuries/add")
  .get(requireAdmin, EcurieController.addForm)
  .post(requireAdmin, EcurieController.addData);

/* FONCTION CONTROLE CONNEXION */
function requireAdmin(req, res, next) {
  if (req.session.isConnected == "" || req.session.isConnected == undefined) {
    res.redirect('/login');
    return;
  }
  next();
}

//Export du router, pour pouvoir l'importer dans router.js
module.exports = router;
