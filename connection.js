var mysql = require('mysql');


var pool = mysql.createPool({
  connectionLimit:4,
  host: "us-cdbr-east-06.cleardb.net",
  user: "b1e8b31636d4a2",
  password: "7bb7087a",
  database:"heroku_684b6f6454b034d"
});

pool.getConnection((err,connection)=> {
  if(err)
  throw err;
  console.log('Database connected successfully');
  connection.release();
});

module.exports = pool;