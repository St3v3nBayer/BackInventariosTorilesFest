const {Router} = require('express');
const userController = require('../controllers/userController');
const Auth = require('../midlewares/auth');

class userRouter{
    constructor(){
        this.router = Router();
        this.#config();
    }

    #config(){
        
        let auth = new Auth();
        const userC = new userController();       
        this.router.post('/user/auth', userC.ingresar);
        this.router.use(auth.verify);
        this.router.get('/user/auth', auth.session);
        this.router.get('/user', userC.getUsuarios);
        this.router.post('/user', userC.crear);
        this.router.delete('/user', userC.eliminar);
        this.router.put('/user', userC.actualizar);
        this.router.post('/user/logout', userC.salir);
        this.router.get('/user/tipo', userC.tipoUsuario);
    }

}

module.exports = userRouter;