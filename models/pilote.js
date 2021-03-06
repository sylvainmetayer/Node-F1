var db = require('../configDb');

module.exports.getListPilotes = function(callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "SELECT distinct SUBSTR(pilnom, 1, 1) as firstLetter FROM pilote ORDER BY pilnom ASC;";
      connexion.query(sql, callback);

      connexion.release();
    }
  });
};

module.exports.getPiloteByLetter = function(lettre, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "SELECT distinct pilnom, pilprenom, p.pilnum, phoadresse, phocommentaire FROM pilote p ";
      sql += " INNER JOIN photo ph on ph.pilnum=p.pilnum ";
      sql += " WHERE SUBSTR(pilnom, 1, 1) = '" + lettre + "' and phonum=1";

      connexion.query(sql, callback);
      connexion.release();
    }
  });
}

module.exports.getPilote = function(pilote, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "SELECT p.pilnum, p.pilnom, p.pilprenom, paynom, p.pilpoints, p.paynum, p.ecunum, p.pildatenais, pilpoids, piltaille, piltexte";
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
      var sql = "SELECT p.pilnum, p.pilnom, p.pilprenom, p.pildatenais FROM pilote p ORDER BY pilnom ASC";
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

module.exports.update = function(data, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "UPDATE pilote SET ? where pilnum="+data.pilnum;
      connexion.query(sql, data, callback);
      connexion.release();
    }
  })
}

module.exports.delete = function(id, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "DELETE FROM pilote WHERE pilnum = " + id;
      connexion.query(sql, callback);
      connexion.release();
    }
  })
}
