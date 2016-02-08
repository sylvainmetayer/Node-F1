var db = require('../configDb');

module.exports.getListResultat = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){
						var sql ="SELECT gpnum, payadrdrap, gpnom FROM grandprix gp JOIN circuit c on c.cirnum=gp.cirnum JOIN pays p ";
						sql= sql + "ON c.paynum=p.paynum  ORDER BY gpnom";
						//console.log (sql);
            connexion.query(sql, callback);
            connexion.release();
         }
      });
};

module.exports.get = function (idGP, callback) {
 db.getConnection(function(err, connexion){
			 if(!err){
         //TODO change SQL request
					 var sql ="SELECT gpnom, gpdate, gpcommentaire FROM grandprix gp WHERE gp.gpnum =" + idGP;
					 //console.log (sql);
					 connexion.query(sql, callback);
					 connexion.release();
				}
		 });
};


module.exports.getPiloteInGP = function (idGP, callback) {
 db.getConnection(function(err, connexion){
			 if(!err){
					 var sql ="SELECT p.pilnom, p.pilprenom, p.pilnum, c.tempscourse FROM grandprix gp JOIN course c ON c.gpnum=gp.gpnum JOIN pilote p ON p.pilnum=c.pilnum WHERE gp.gpnum ="+ idGP +" ORDER BY tempscourse ASC";
					 connexion.query(sql, callback);
					 connexion.release();
				}
		 });
};
