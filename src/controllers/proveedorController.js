const proveedorQ = require('../models/proveedorQuerys');

class ProveedorController {

    getProvedores(req, res) {
        req.getConnection((error, conexion) => {
            if (error) {
                res.status(500).send(error);
            } else {
                conexion.query(proveedorQ.getProveedores, (error, rows) => {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        res.status(200).json(rows);
                    }
                })
            }
        })
    }

    crearProveedor(req, res) {
        let { nombre, marca } = req.body;
        if (nombre && marca) {
            req.getConnection((error, conexion) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    conexion.query(proveedorQ.insertProveedor, [nombre, marca], (error, rows) => {
                        if (error) {
                            res.status(500).send(error);
                        }else{
                            res.status(201).json({ message: 'Proveedor Creado!' });
                        }
                    })
                }
            })
        } else {
            res.status(400).send();
        }
    }

    actualizarProveedor(req, res) {
        let { id, nombre, marca } = req.body;
        if( id && nombre && marca ){
            req.getConnection((error, conexion)=>{
                if(error){
                    res.status(500).send(error);
                }else{
                    conexion.query(proveedorQ.updateProveedor, [nombre, marca, id], (error, rows)=>{
                        if(error){
                            res.status(500).send(error);
                        }else{
                            res.status(200).json({message: 'Proveedor Actualicado!'});
                        }
                    });
                }
            })
        }else{
            res.status(400).send();
        }
    }

    eliminarProveedor(req, res) {
        let { id } = req.body;
        if(id){
            req.getConnection((error, conexion)=>{
                if(error){
                    res.status(500).send(error);
                }else{
                    conexion.query(proveedorQ.borrarProveedor, [id], (error, rows)=>{
                        if(error){
                            res.status(500).send(error);
                        }else{
                            res.status(200).json({message: 'Proveedor Eliminado!'});
                        }
                    })
                }
            })
        }else{
            res.status(400).send();
        }
    }

}

module.exports = ProveedorController; 