var model = require('../models/resultat.js');

module.exports.Index = function(request, response) {
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

    model.getLastResultat(function(err, res) {
        if (err)  {
          console.log(err);
          return;
        }
        response.resultat = res[0];
        response.render('home', response);
      });
    };
