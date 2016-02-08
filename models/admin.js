var db = require('../configDb');

module.exports.CheckLogin = function (login, passwd, callback) {
	db.getConnection(function(err, connexion){
        if(!err){
						var sql ="SELECT login, passwd FROM login WHERE login = '" + login + "' AND passwd = '" + passwd + "'";
						//console.log (sql);
            connexion.query(sql, callback);
            connexion.release();
         }
      });
};
