const InvQ = require('../models/inventarioQuerys');

class InventariosController {

    getInventarios(req, res){
        req.getConnection((error, conexion)=>{
            if(error){
                res.status(500).send(error);
            }else{
                conexion.query(InvQ.getInv, (error, rows)=>{
                    if(error){
                        res.status(500).send(error);
                    }else{
                        res.status(200).json(rows);
                    }
                })
            }
        })
    }

}

module.exports = InventariosController;