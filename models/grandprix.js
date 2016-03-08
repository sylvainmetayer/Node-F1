var db = require('../configDb');


module.exports.deleteByCircuit = function(id, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "delete from grandprix WHERE cirnum = " + id;
      connexion.query(sql, callback);
      connexion.release();
    }
  })
}
