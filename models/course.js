var db = require('../configDb');

module.exports.deleteByPilote = function(id, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "DELETE FROM photo WHERE pilnum = " + id;
      connexion.query(sql, callback);
      connexion.release();
    }
  })
}

module.exports.deleteEssaisByPilote = function(id, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "DELETE FROM essais WHERE pilnum = " + id;
      connexion.query(sql, callback);
      connexion.release();
    }
  })
}

module.exports.deleteEssaisByCircuit = function(id, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "delete from essais WHERE gpnum = ( SELECT gpnum FROM grandprix WHERE cirnum = " + id + ");";
      connexion.query(sql, callback);
      connexion.release();
    }
  })
}

module.exports.deleteByCircuit = function(id, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "delete from essais WHERE gpnum = ( SELECT gpnum FROM grandprix WHERE cirnum = " + id + ");";
      connexion.query(sql, callback);
      connexion.release();
    }
  })
}
