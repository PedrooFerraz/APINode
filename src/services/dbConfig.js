const dotenv = require("dotenv")
const sql = require('mssql')
dotenv.config();


const sqlConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_USER_PASSWORD,
    database: process.env.SQL_DATABASE_NAME,
    server: process.env.SQL_DATABASE_SERVER,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

let pool;

async function getConnection() {
  if (!pool) {
    try {
      pool = await sql.connect(sqlConfig);
      console.log("Conexão com o banco de dados estabelecida.");
    } catch (err) {
      console.error("Erro ao conectar com o banco de dados:", err);
      throw err;
    }
  }
  return pool;
}

module.exports = { getConnection };