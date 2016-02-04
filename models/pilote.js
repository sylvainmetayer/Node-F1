var db = require('../configDb');

module.exports.getListPilotes = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){
						var sql ="SELECT distinct SUBSTR(pilnom, 1, 1) as firstLetter FROM pilote ORDER BY pilnom ASC;";
						//console.log (sql);
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

module.exports.getPiloteByLetter = function(lettre, callback) {
  //console.log("SQL LETTRE : " + lettre);
    db.getConnection(function(err, connexion) {
      if (!err) {
				//TODO bug fix : Kimi R (affichage multiple)
        var sql = "SELECT distinct pilnom, pilprenom, p.pilnum, phoadresse, phocommentaire FROM pilote p ";
        sql += " INNER JOIN photo ph on ph.pilnum=p.pilnum ";
        sql += " WHERE SUBSTR(pilnom, 1, 1) = '" + lettre + "'";
        //console.log(sql);

        connexion.query(sql, callback);
        connexion.release();
      }
    });
}

module.exports.getPilote = function(pilote, callback) {
	db.getConnection(function(err, connexion) {
		if (!err) {
			var sql = "SELECT p.pilnum, p.pilnom, p.pilprenom, paynom, p.pildatenais, pilpoids, piltaille, piltexte";
			sql += " FROM pilote p JOIN pays pa on pa.paynum=p.paynum ";
			sql += " WHERE p.pilnum=" + pilote;

			connexion.query(sql, callback);
			connexion.release();
		}
	})
}
