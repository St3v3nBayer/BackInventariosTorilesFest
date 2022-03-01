const { Router } = require('express');
const ProveedorController = require('../controllers/proveedorController');

class ProveedorRouter{

    constructor(){
        this.router = Router();
        this.#config();
    }

    #config(){

        const proveedorC = new ProveedorController();
        this.router.get('/proveedor', proveedorC.getProvedores);
        this.router.post('/proveedor', proveedorC.crearProveedor);
        this.router.put('/proveedor', proveedorC.actualizarProveedor);
        this.router.delete('/proveedor', proveedorC.eliminarProveedor);

    }

}

module.exports = ProveedorRouter;