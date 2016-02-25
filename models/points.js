var db = require('../configDb');

module.exports.getPoints = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){
						var sql ="SELECT ptplace, ptnbpointsplace FROM points"
						//console.log (sql);
            connexion.query(sql, callback);
            connexion.release();
         }
      });
};
