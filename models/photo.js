var db = require('../configDb');

module.exports.getPhotosByPilote = function(idPilote, callback) {
  //console.log("SQL LETTRE : " + lettre);
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "SELECT phonum, phosujet, phoadresse, phocommentaire FROM photo p WHERE pilnum =" + idPilote;

      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.deleteByPilote = function(id, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "DELETE FROM photo WHERE pilnum = " + id;
      connexion.query(sql, callback);
      connexion.release();
    }
  })
}
