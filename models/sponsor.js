var db = require('../configDb');

module.exports.getSponsorsByPilote = function(idPilote, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "SELECT s.sponum, s.sponom, s.sposectactivite FROM sponsor s JOIN sponsorise sp on sp.sponum=s.sponum WHERE sp.pilnum =  " + [idPilote];
      connexion.query(sql, callback)
      connexion.release();
    }
  });
};


module.exports.getAllSponsors = function(callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "SELECT s.sponum, s.sponom, s.sposectactivite FROM sponsor s order by s.sponom asc ";
      connexion.query(sql, callback)
      connexion.release();
    }
  });
};

module.exports.addSponsor = function(data, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {

      var sql = "INSERT INTO sponsor SET ?";
      connexion.query(sql, data, function(err, result) {
        if (err) throw err;
        callback(err, result);
      });
      connexion.release();
    }
  })
}
