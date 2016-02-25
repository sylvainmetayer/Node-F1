/*
* config.Db contient les parametres de connection à la base de données
* Il utilise le module mysql
* il va créer aussi un pool de connexions utilisables
* la méthode getConnection permet de se connecter à MySQL
*
*/

var user ="bd";
var host = "localhost";
var password = "bede";

// Si on est sur le serveur, on récupère les parametres.
if(process.env.OPENSHIFT_MYSQL_DB_URL){
  var tmpString = process.env.OPENSHIFT_MYSQL_DB_URL
  var tab = tmpString.split(":");
  user = tab[1].split("//")[1];
  host = tab[2].split("@")[1];
  port = tab[3].split("/")[0];
  password = tab[2].split("@")[0];
}
var mysql = require('mysql'); // voir https://github.com/felixge/node-mysql/

var pool  = mysql.createPool({
  host     : host,
  user     : user,
  password : password,
  database : 'grandprix'
});

module.exports.getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};
