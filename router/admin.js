var AdminController = require('../controllers/AdminController');
var HomeController = require('../controllers/HomeController');
var ResultatController = require('../controllers/ResultatController');
var EcurieController = require('../controllers/EcurieController');
var PiloteController = require('../controllers/PiloteController');
var CircuitController = require('../controllers/CircuitController');

var express = require('express');
var router = express.Router();

router.route('/login')
  .get(AdminController.Login)
  .post(AdminController.CheckLogin);
  
module.exports = router;
