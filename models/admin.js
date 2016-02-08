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
