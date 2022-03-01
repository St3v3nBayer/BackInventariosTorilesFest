const res = require('express/lib/response');
const movimienQ = require('../models/movimientosQuerys');

class MovimientosController {

    getMovimientos(req, res) {
        req.getConnection((error, conexion) => {
            if (error) {
                res.status(500).send(error);
            } else {
                conexion.query(movimienQ.getMovi, (error, rows) => {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        let fecha = new Date()
                        fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset())
                        fecha.setHours(0, 0, 0, 0);
                        rows.map(e => {
                            e.fecha_movimiento.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset());
                            e.fecha_movimiento.setHours(0, 0, 0, 0);
                        })
                        let result = rows.filter((e) => {
                            return String(e.fecha_movimiento) === String(fecha);
                        });
                        res.status(200).json(result);
                    }
                })
            }
        })
    }

    insertMovimiento(req, res) {
        let { tipoMovimiento, idProducto, idUsuario, cant } = req.body;
        if (tipoMovimiento && idProducto && idUsuario && cant) {
            req.getConnection((error, conexion) => {
                if (error) {
                    res.status(500).send(error);
                }
                conexion.query(movimienQ.inserMovi, [tipoMovimiento, idProducto, idUsuario, cant], (error, rows) => {
                    if (error) {
                        res.status(500).send(error);
                    }
                    res.status(201).json({ message: 'Movimiento Realizado!' });
                })
            })
        } else {
            res.status(400).send();
        }
    }

    getMovimientoFiltro(req, res) {
        const { fechaI, fechaF } = req.body;
        console.log(fechaI, fechaF);
        if (fechaI && fechaF) {
            req.getConnection((error, conexion) => {
                if (error) {
                    req.status(500).send(error);
                } else {
                    conexion.query(movimienQ.filterMovi, [fechaI, fechaF], (error, rows) => {
                        if (error) {
                            res.status(500).send(error);
                        } else {
                            res.status(200).json(rows);
                        }
                    })
                }
            })
        } else {
            res.status(400).send();
        }
    }

}

module.exports = MovimientosController;