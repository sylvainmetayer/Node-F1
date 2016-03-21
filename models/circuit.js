var db = require('../configDb');

module.exports.getAllCircuits = function(callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "SELECT cirnum, cirnom, c.paynum, payadrdrap, paynom FROM circuit c JOIN pays pa on pa.paynum=c.paynum ORDER by cirnom ASC";
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.getAllCircuitsAdmin = function(callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "SELECT cirnum, cirnom, cirnbspectateurs, cirlongueur FROM circuit c ORDER by cirnom ASC";
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.get = function(id, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "SELECT c.cirnum, c.cirnom, c.cirlongueur, c.cirnbspectateurs, cirtext, ciradresseimage, c.paynum, payadrdrap, paynom FROM circuit c JOIN pays pa on pa.paynum=c.paynum WHERE cirnum=" + id;
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.add = function(data, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "INSERT INTO circuit SET ?";
      connexion.query(sql, data, callback);
      console.log(sql);
      connexion.release();
    }
  })
}

module.exports.update = function(data, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "UPDATE circuit SET ? where cirnum="+data.cirnum;
      connexion.query(sql, data, callback);
      connexion.release();
    }
  })
}

module.exports.delete = function(id, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "delete from circuit WHERE cirnum = " + id;
      connexion.query(sql, callback);
      connexion.release();
    }
  })
}
