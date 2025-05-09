var Connection = require('tedious').Connection;  
const dotenv = require("dotenv")
dotenv.config();

var config = {  
    server: process.env.SQL_DATABASE_SERVER,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.SQL_USER, 
            password: process.env.USER_PASSWORD,
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: process.env.SQL_DATABASE_NAME
    }
};  
var connection = new Connection(config);  
connection.on('connect', function(err) {  
    // If no error, then good to proceed.
    console.log("Connected");  
});

connection.connect();
