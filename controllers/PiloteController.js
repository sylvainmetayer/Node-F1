var piloteModel = require('../models/pilote.js');
var sponsorModel = require('../models/sponsor.js');
var photoModel = require('../models/photo.js');
var ecurieModel = require('../models/ecurie.js');
var natioModel = require('../models/nationalite.js');
var courseModel = require("../models/course.js");
var async = require('async');

/* PARTIE CLIENT */

module.exports.Repertoire = function(request, response) {
  response.title = 'Répertoire des pilotes';

  piloteModel.getListPilotes(function(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.lettrePilote = result;
    //console.log("RESULTAT : " +result);
    response.render('repertoirePilotes', response);
  });
};

/**
Permet de retourner les pilotes, selon la premiere lettre de leur nom
*/
module.exports.RepertoireByLetter = function(request, response) {
  var lettre = request.params.lettre;
  response.title = 'Liste des pilotes';

  async.parallel([
      function(callback) {
        piloteModel.getPiloteByLetter(lettre, function(err, resultat) {
          callback(null, resultat)
        });
      }, //Fin callback 0
      function(callback) {
        piloteModel.getListPilotes(function(erreur, resultat) {
          callback(null, resultat)
        });
      } // fin callback 1
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      response.listePilote = result[0]; //Résultat première fonction.
      response.lettrePilote = result[1]; //Résultat deuxième fonction.
      //console.log(response);
      response.render('repertoirePilotes', response);
    }); //Fin async
};

module.exports.GetPilote = function(request, response) {
  var pilote = request.params.pilote;
  response.title = "Détails d'un pilote";

  async.parallel([
      function(callback) {
        piloteModel.getPilote(pilote, function(err, result) {
          callback(err, result)
        });
      }, //Fin callback 0
      function(callback) {
        piloteModel.getListPilotes(function(erreur, resultat) {
          callback(erreur, resultat)
        });
      }, // fin callback 1
      function(callback) {
        sponsorModel.getSponsorsByPilote(pilote, function(erreur, resultat) {
          callback(erreur, resultat)
        });
      },
      function(callback) {
        photoModel.getPhotosByPilote(pilote, function(err, res) {
          callback(err, res)
        });
      },
      function(callback) {
        ecurieModel.getEcurie(pilote, function(err, res) {
          callback(err, res)
        });
      }
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      response.pilote = result[0][0]; //Résultat première fonction.
      response.lettrePilote = result[1]; //Résultat deuxième fonction.
      response.sponsors = result[2];
      response.listePhotosPilote = result[3];
      response.ecuriePilote = result[4][0];
      response.render('repertoirePilotes', response);
    }

  ); //Fin async

};

/* PARTIE ADMIN */

module.exports.ListerPiloteAdmin = function(req, res) {
  res.title = 'Admin - Liste des pilotes';

  piloteModel.getAllPilotes(function(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    res.pilotes = result;
    res.render('admin/adminListerPilote', res);
  });
};

module.exports.delete = function(req, res) {
  var id = req.params.id;
  async.series([
      function(callback) {
        courseModel.deleteByPilote(id, function(erreur, resultat) {
          callback(erreur, resultat);
        });
      },
      function(callback) {
        courseModel.deleteEssaisByPilote(id, function(erreur, resultat) {
          callback(erreur, resultat);
        });
      },
      function(callback) {
        sponsorModel.deleteByPilote(id, function(erreur, resultat) {
          callback(erreur, resultat);
        });
      },
      function(callback) {
        photoModel.deleteByPilote(id, function(erreur, resultat) {
          callback(erreur, resultat);
        });
      },
      function(callback) {
        piloteModel.delete(id, function(err, result) { 
          callback(err, result);
        });
      }

    ],
    function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect("/admin/pilotes");
    }
  );
};

module.exports.addForm = function(request, response) {
  response.title = 'Ajout d\'un pilote';

  async.parallel([
      function(callback) {
        ecurieModel.getListeEcurie(function(err, result) {
          callback(err, result)
        });
      },
      function(callback) {
        natioModel.getAllNationnalites(function(erreur, resultat) {
          callback(erreur, resultat)
        });
      }
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      response.ecuries = result[0];
      response.nationalites = result[1];
      response.render('admin/adminAddPilote', response);
    }
  );
};

module.exports.updateForm = function(request, response) {
  response.title = "Modification d'un pilote";

  var id = request.params.id;

  async.parallel([
      function(callback) {
        ecurieModel.getListeEcurie(function(err, result) {
          callback(err, result);
        })
      },
      function(callback) {
        natioModel.getAllNationnalites(function(erreur, resultat) {
          callback(erreur, resultat);
        })
      },
      function(callback) {
        piloteModel.getPilote(id, function(err, res) {
          callback(err, res);
        })
      }
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      response.ecuries = result[0];
      response.nationalites = result[1];
      response.pilote = result[2][0];
      response.render('admin/piloteUpdateForm', response);
    }
  );

}

module.exports.updateData = function(request, response) {

  var pildatenaisForm = request.body.pildatenais;
  tab = pildatenaisForm.split("/");
  var pildatenaissance = new Date(tab[2], tab[1] - 1, tab[0]);

  var dataPilote = {
    pilnum: request.body.pilnum,
    pilnom: request.body.pilnom,
    pilprenom: request.body.pilprenom,
    paynum: request.body.paynum,
    ecunum: request.body.ecunum,
    pilpoints: request.body.pilpoints,
    pildatenais: pildatenaissance,
    pilpoids: request.body.pilpoids,
    piltaille: request.body.piltaille,
    piltexte: request.body.piltexte
  }

  piloteModel.update(dataPilote, function(erreur, resultat) {
    if (erreur) {
      console.log(erreur);
      return;
    }
    response.result = {
      ajout: "Update OK"
    };
    response.redirect("/admin/pilotes");
    return;
  });

}

module.exports.addData = function(request, response) {
  response.title = 'Ajout d\'un pilote';

  var pildatenaisForm = request.body.pildatenais;
  tab = pildatenaisForm.split("/");
  var pildatenaissance = new Date(tab[2], tab[1] - 1, tab[0]);

  var dataPilote = {
    pilnum: request.body.pilnum,
    pilnom: request.body.pilnom,
    pilprenom: request.body.pilprenom,
    paynum: request.body.paynum,
    ecunum: request.body.ecunum,
    pilpoints: request.body.pilpoints,
    pildatenais: pildatenaissance,
    pilpoids: request.body.pilpoids,
    piltaille: request.body.piltaille,
    piltexte: request.body.piltexte
  }

  piloteModel.add(dataPilote, function(erreur, resultat) {
    if (erreur) {
      console.log(erreur);
      return;
    }
    response.result = {
      ajout: "Ajout OK"
    };
    response.redirect("/admin/pilotes");
    return;
  });

};
