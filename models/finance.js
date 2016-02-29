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
