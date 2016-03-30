var db = require('../configDb');

module.exports.addFinance = function(data, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {

      var sql = "INSERT INTO finance SET ? ";
      connexion.query(sql, data, callback)
      connexion.release();
    }
  });
};

module.exports.deleteFinance = function(id, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      var sql = "DELETE FROM finance WHERE sponum = " + id;
      connexion.query(sql, callback);
      connexion.release();
    }
  })
}
