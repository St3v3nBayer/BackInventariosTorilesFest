const { Router } = require('express');
const MovimientosController = require('../controllers/movimientosController');

class MovimientosRouter{

    constructor(){
        this.router = Router();
        this.#config();
    }

    #config(){
        let movimienC = new MovimientosController();
        this.router.get('/movimientos', movimienC.getMovimientos);
        this.router.post('/movimientos', movimienC.insertMovimiento);
        this.router.post('/movimientos/filtro', movimienC.getMovimientoFiltro);
    }

}

module.exports = MovimientosRouter;