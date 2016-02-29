var db = require('../configDb');

/*
 * Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
 * @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
 */
module.exports.getListeEcurie = function(callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "SELECT ecunum, payadrdrap, ecunom FROM ecurie e INNER JOIN pays p ";
      sql = sql + "ON p.paynum=e.paynum ORDER BY ecunom";
      //console.log (sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.getAllEcurie = function(callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "SELECT ecunum, ecunom FROM ecurie e ORDER BY ecunom";
      connexion.query(sql, callback);
      connexion.release();
    }
  });
}

module.exports.getPilote = function(idEcurie, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "SELECT distinct p.pilnum, p.pilnom, ph.phoadresse FROM ecurie e JOIN pilote p on p.ecunum=e.ecunum JOIN photo ph ON ph.pilnum=p.pilnum WHERE phonum=1 AND e.ecunum =" + idEcurie;
      //console.log (sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.getVoiture = function(idEcurie, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "SELECT v.voinom, v.voinum, tv.typelibelle, v.voiadresseimage FROM ecurie e JOIN voiture v on v.ecunum=e.ecunum JOIN type_voiture tv ON tv.typnum=v.typnum WHERE e.ecunum =" + idEcurie;
      //console.log (sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.get = function(idEcurie, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "SELECT e.ecunum, e.ecunom, fp.fpnom, pa.paynom, ecunomdir, ecuadrsiege, ecuadresseimage FROM ecurie e JOIN pays pa on pa.paynum=e.paynum JOIN fourn_pneu fp ON fp.fpnum=e.fpnum WHERE e.ecunum =" + idEcurie;
      //console.log (sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};


module.exports.getEcurie = function(idPilote, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "SELECT e.ecunum, e.ecunom FROM ecurie e INNER JOIN pilote p ON p.ecunum=e.ecunum WHERE p.pilnum =" + idPilote;
      //console.log (sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};
