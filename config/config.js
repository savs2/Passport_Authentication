const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    
node_env: process.env.NODE_ENV,
port: process.env.PORT,
database: process.env.DATABASE,
db_user: process.env.DB_USER,
db_pass: process.env.DB_PASS,
db_host: process.env.DB_HOST,

};