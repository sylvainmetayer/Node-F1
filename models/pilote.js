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
        var sql = "SELECT distinct pilnom, pilprenom, p.pilnum, phoadresse, phocommentaire FROM pilote p ";
        sql += " INNER JOIN photo ph on ph.pilnum=p.pilnum ";
        sql += " WHERE SUBSTR(pilnom, 1, 1) = '" + lettre + "' and phonum=1";
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

module.exports.getAllPilotes = function(callback) {
	db.getConnection(function(err, connexion) {
		if (!err) {
			var sql = "SELECT p.pilnum, p.pilnom, p.pilprenom, p.pildatenais FROM pilote p";
			connexion.query(sql, callback);
			connexion.release();
		}
	})
}

module.exports.add = function(data, callback) {
	db.getConnection(function(err, connexion) {
		if (!err) {
			var sql = "INSERT INTO pilote SET ?";
			connexion.query(sql, data, callback);
			connexion.release();
		}
	})
}
