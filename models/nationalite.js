var db = require('../configDb');

module.exports.getAllNationnalites = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){
						var sql ="SELECT paynum, paynat FROM pays p ";
						//console.log (sql);
            connexion.query(sql, callback);
            connexion.release();
         }
      });
};
