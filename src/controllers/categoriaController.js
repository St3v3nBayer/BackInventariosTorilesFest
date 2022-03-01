const catQ = require('../models/categoriaQuerys');

class CatController {

    getCat(req, res) {
        req.getConnection((error, conexion) => {
            if (error) {
                res.status(500).send(error);
            } else {
                conexion.query(catQ.getCat, (error, rows, fields) => {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        res.status(200).json(rows);
                    }
                });
            }
        })
    }

    crearCat(req, res) {
        let { descripcion } = req.body;
        if (descripcion) {
            req.getConnection((error, conexion) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    conexion.query(catQ.insertCat, [descripcion], (error, rows) => {
                        if (error) {
                            res.status(500).send(error);
                        } else {
                            res.status(201).json({ message: 'Categoria Creada!' });
                        }
                    });
                }
            })
        } else {
            res.status(400).send();
        }
    }

    actualizarCat(req, res) {
        const { id, descripcion } = req.body;
        if (id && descripcion) {
            req.getConnection((error, conexion) => {
                if (error) res.status(500).send(error);
                conexion.query(catQ.updateCat, [descripcion, id], (error, rows) => {
                    if (error) res.status(500).send(error);
                    res.status(200).json({message: 'Categoria Actualizada'});
                })
            })
        } else {
            res.status(400).send();
        }
    }

    eliminarCat(req, res) {
        const { id } = req.body;
        if (id) {
            req.getConnection((error, conexion) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    conexion.query(catQ.borrarCat, [id], (error, rows) => {
                        if (error) {
                            res.status(500).send(error);
                        } else {
                            res.status(200).json({ message: 'Categoria Eliminada!' });
                        }
                    })
                }
            })
        } else {
            res.status(400).send();
        }
    }
}


module.exports = CatController;