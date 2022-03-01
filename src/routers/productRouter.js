const { Router } = require('express');
const ProductController = require('../controllers/productController');
const Auth = require('../midlewares/auth');

class ProductRouter{

    constructor(){
        this.router = Router();
        this.#config();
    }

    #config(){
        // const auth = new Auth();
        // this.router.use(auth.verify);
        const productC = new ProductController();
        this.router.get('/producto', productC.getProductos);
        this.router.post('/producto', productC.crearProducto);
        this.router.put('/producto', productC.actualizarProducto);
        this.router.delete('/producto', productC.eliminarPorducto);

    }


}

module.exports = ProductRouter;