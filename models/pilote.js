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
  console.log("SQL LETTRE : " + lettre);
    db.getConnection(function(err, connexion) {
      if (!err) {
        var sql = "SELECT pilnom, pilprenom, phoadresse, phocommentaire FROM pilote p ";
        sql += " INNER JOIN photo ph on ph.pilnum=p.pilnum ";
        sql += " WHERE SUBSTR(pilnom, 1, 1) = '" + lettre + "'";
        //console.log(sql);

        connexion.query(sql, callback);
        connexion.release();
      }
    });
}
