const { Router } = require('express');
const InventariosController = require('../controllers/inventariosController');


class InventariosRouter{
    constructor(){
        this.router = Router();
        this.#config();
    }

    #config(){
        const InvC = new InventariosController();
        this.router.get('/inventario', InvC.getInventarios);
    }

}

module.exports = InventariosRouter;