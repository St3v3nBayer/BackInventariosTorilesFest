const { Router } = require('express');
const CatController = require('../controllers/categoriaController');
const Auth = require('../midlewares/auth');

class CatRouter{
    constructor(){
        this.router = Router();
        this.#config();
    }

    #config(){
        // const auth = new Auth();
        // this.router.use(auth.verify);
        const catC = new CatController();
        this.router.post('/categoria', catC.crearCat);
        this.router.get('/categoria', catC.getCat);
        this.router.put('/categoria', catC.actualizarCat);
        this.router.delete('/categoria', catC.eliminarCat);
    }

}
module.exports = CatRouter;