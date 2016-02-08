var AdminController = require('../controllers/AdminController');
var HomeController = require('../controllers/HomeController');
var ResultatController = require('../controllers/ResultatController');
var EcurieController = require('../controllers/EcurieController');
var PiloteController = require('../controllers/PiloteController');
var CircuitController = require('../controllers/CircuitController');

var express = require('express');
var router = express.Router();



//On exporte les routes.
module.exports = router;



var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.get('/login', AdminController.Login);
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
