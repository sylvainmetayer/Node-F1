var db = require('../configDb');

module.exports.getAllCircuits = function(callback) {
  //console.log("SQL LETTRE : " + lettre);
    db.getConnection(function(err, connexion) {
      if (!err) {
        var sql = "SELECT cirnum, cirnom, c.paynum, payadrdrap, paynom FROM circuit c JOIN pays pa on pa.paynum=c.paynum ORDER by cirnom ASC";
        //console.log(sql);

        connexion.query(sql, callback);
        connexion.release();
      }
    });
};

module.exports.get= function(id, callback) {
  //console.log("SQL LETTRE : " + lettre);
    db.getConnection(function(err, connexion) {
      if (!err) {
        var sql = "SELECT c.cirnum, c.cirnom, c.cirlongueur, c.cirnbspectateurs, cirtext, ciradresseimage, c.paynum, payadrdrap, paynom FROM circuit c JOIN pays pa on pa.paynum=c.paynum WHERE cirnum="+id;
        //console.log(sql);

        connexion.query(sql, callback);
        connexion.release();
      }
    });
};
