var db = require('../configDb');

module.exports.getSponsorsByPilote = function (idPilote, callback) {
	db.getConnection(function(err, connexion){
        if(!err){
						var sql ="SELECT s.sponum, s.sponom, s.sposectactivite FROM sponsor s JOIN sponsorise sp on sp.sponum=s.sponum WHERE sp.pilnum =  " + idPilote;
						//console.log (sql);
            connexion.query(sql, callback)
            connexion.release();
         }
      });
};
