const MySQLStore = require('express-mysql-session');

const database = {
    host: 'localhost',
    port: 3306,
    database: 'dbinventarios',
    user: 'root',
    password: 'root1234'
}

module.exports = {
    database, options: {
        secret: '+*!ClaV3S3cr3t@!*+',
        resave: false,
        saveUninitialized: false,
        store: new MySQLStore(database),
        name: 'ID_SESSION',
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        }
    }
};