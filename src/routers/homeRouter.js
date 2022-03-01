const { Router } = require('express');

class HomeRouter{
    
    constructor(){
        this.router = Router();
        this.#config();
    }

    #config(){
        this.router.get('/', (req, res)=>{
            res.status(200).json({message: 'All ok!'});
        })
    }
}

module.exports = HomeRouter;