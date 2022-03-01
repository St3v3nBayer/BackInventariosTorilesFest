const productQ = require('../models/productQuerys');

class ProductController{

    getProductos(req, res){
        req.getConnection((error, conexion)=>{
            if(error)throw error;
            conexion.query(productQ.getProductos, (error, rows, fields)=>{
                if(error)res.status(500).json(error);
                res.status(200).json(rows);
            })
        })
    }

    crearProducto(req, res){
        let { nombre, precio, categoria, proveedor } = req.body;
        if(nombre && precio && categoria && proveedor){
            req.getConnection((error, conexion)=>{
                if(error)res.status(500).send(error);
                conexion.query(productQ.insertProducto, [nombre, precio, categoria, proveedor], (error, rows, fields)=>{
                    if(error){
                        res.status(500).send(error);
                    }else{
                        req.getConnection((error, conexion)=>{
                            if(error)throw error;
                            conexion.query(productQ.getProductos, (error, rows, fields)=>{
                                if(error)res.status(500).json(error);
                                res.status(200).json(rows);
                            })
                        })
                        // res.status(201).json({message: 'Producto Creado!'});
                    }
                })
            })
        }
        else{
            res.status(400).send();
        }

    }

    actualizarProducto(req, res){
        let { id, nombre, precio, categoria, proveedor } = req.body;
        req.getConnection((error, conexion)=>{
            if(error)res.status(500).send(error);
            conexion.query(productQ.updateProducto, [nombre, precio, categoria, proveedor, id], (error, rows, fields)=>{
                if(error){
                    res.status(500).send(error);
                }else{
                    req.getConnection((error, conexion)=>{
                        if(error)throw error;
                        conexion.query(productQ.getProductos, (error, rows, fields)=>{
                            if(error)res.status(500).json(error);
                            res.status(200).json(rows);
                        })
                    })
                    // res.status(200).json({message: 'Producto Actualizado!'})
                }
            })
        })
    }

    eliminarPorducto(req, res){
        let { id } = req.body;
        if(id){
            req.getConnection((error, conexion)=>{
                if(error)res.status(500).send(error);
                conexion.query(productQ.borrarProducto, [id], (error, rows, fields)=>{
                    if(error){
                        res.status(500).send(error);
                    }else{
                        req.getConnection((error, conexion)=>{
                            if(error)throw error;
                            conexion.query(productQ.getProductos, (error, rows, fields)=>{
                                if(error)res.status(500).json(error);
                                res.status(200).json(rows);
                            })
                        })
                        // res.status(200).json({message: 'Producto Eliminado!'})
                    }
                })
            })
        }else{
            res.status(400).send();
        }
    }


}

module.exports = ProductController;