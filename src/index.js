const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const session = require('express-session');


const { database, options } = require('./database/db');
const userRouter = require('../src/routers/userRouter');
const ProductRouter = require('./routers/productRouter');
const CatRouter = require('./routers/categoriaRouter');
const ProveedorRouter = require('./routers/proveedorRouter');
const MovimientosRouter = require('./routers/movimientosRouter');
const HomeRouter = require('./routers/homeRouter');
const InventariosRouter = require('./routers/inventariosRouter');


class Server{

    constructor() {
        this.app = express();
        this.#config();
    }

    #config(){
        this.app.use(myConnection(mysql, database, 'pool'));
        this.app.use(session(options));
        this.app.use(express.json());
        this.app.use(morgan());
        this.app.use(cors({'origin':'http://localhost:3001', credentials: true}));
        this.app.set('PORT', process.env.PORT || 3000);

        //Crear Rutas
        const InvR = new InventariosRouter();
        const homeR = new HomeRouter();
        const userR = new userRouter();
        const productR = new ProductRouter();
        const proveedorR = new ProveedorRouter();
        const catR = new CatRouter();
        const movimienR = new MovimientosRouter();
        //Añadir Rutas
        this.app.use(userR.router);
        this.app.use(homeR.router);
        this.app.use(proveedorR.router);
        this.app.use(productR.router);
        this.app.use(catR.router);
        this.app.use(movimienR.router);
        this.app.use(InvR.router);

        // Poner servidor a la escucha
        this.app.listen(this.app.get('PORT'), ()=>{
            console.log("Servidor corriendo por el puerto: ", this.app.get('PORT'));
        })
    }

}

new Server;