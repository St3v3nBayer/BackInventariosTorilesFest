
//*************** OPCION 2 PARA CREAR CONEXION CON BASE DE DATOS MYSQL ******************//

// const mysql = require('mysql');
// const { database } = require('./db');


// const pool = mysql.createPool(database);

// pool.getConnection((err, connection) => {
//     if (err) {
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.error('DATABASE CONNECTION WAS CLOSED');
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.error('DATABASE HAS TO MANY CONNECTIONS');
//         }
//         if(err.code === 'ECONNREFUSED'){
//             console.erro('DATABASE CONNECTION WAS REFUSED');
//         }
//     }
//     if(connection){
//         connection.release()
//         console.log('DB is Connected');
//     };
//     return;
// })
// Promisify Pool Querys
// pool.query = promisify(pool.query); importar promisify

//*************** OPCION 3 PARA CREAR CONEXION CON BASE DE DATOS MYSQL ******************//

// const mysql = require('mysql');

// const conexion = mysql.createConnection({
//     host: 'localhost',
//     database: 'dbinventarios',
//     user: 'root',
//     password: 'root1234'
// });

// conexion.connect((error) => {
//     if(error){
//         throw error;
//     }else{
//         console.log('CONEXION EXITOSA')
//     }
// });

// conexion.query('SELECT *  from categoria', (error, data, fields)=>{
//     if(error){
//         throw error;
//     }else{
//         data.forEach(element=>{
//             console.log(element);
//         })
//     }
// })
// conexion.end();

// module.exports = pool;