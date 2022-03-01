// const ConnectDb = require('../database/connectDb');
const bcryptjs = require('bcryptjs');
const UserQ = require('../models/userQuerys');

// conexion.end();

class userController {

    getUsuarios(req, res) {
        req.getConnection((error, conexion) => {
            if (error) {
                res.status(500).json(error);
            } else {
                conexion.query(UserQ.getUsuarios, (error, rows) => {
                    if (error) {
                        res.status(500).json(error);
                    }
                    res.status(200).json(rows);
                });
            }
        });
    }

    ingresar(req, res) {
        let { idusuario, contraseña_usuario } = req.body;
        if (!idusuario || !contraseña_usuario || idusuario === undefined || idusuario === null || contraseña_usuario === undefined || contraseña_usuario === null) {
            res.status(401).json({ message: 'Ingrese Datos Validos' });
        } else {
            req.getConnection((error, conexion) => {
                if (error) {
                    res.status(400).json({ error: error, message: 'Error conexion!' });
                } else {
                    conexion.query(UserQ.getId, [idusuario], (error, rows, fields) => {
                        if (!error) {
                            if (rows.length == 0) {
                                res.status(401).json({ message: "Usuario No existe!" });
                            } else {
                                if (rows[0].estado_usuario == 'Activado') {
                                    let result = bcryptjs.compareSync(contraseña_usuario, rows[0].contraseña_usuario);
                                    if (result) {
                                        req.session.auth = true;
                                        req.session.rol = rows[0].idrol_usuario;
                                        req.session.nombre = rows[0].nombre_usuario;
                                        req.session.identificacion = rows[0].idusuario;
                                        res.status(200).json({ auth: true });
                                    } else {
                                        res.status(401).json({ auth: false, message: 'Contraseña Invalida!' });
                                    }
                                } else {
                                    res.status(401).json({ auth: false, message: 'Usuario no autorizado!' });

                                }
                            }
                        } else {
                            res.status(500).json({ error: error, message: 'Error conexion!' });
                        }
                    });
                }
            })
        }
    }

    crear(req, res) {
        let { idusuario, nombre_usuario, apellido_usuario, contraseña_usuario, telefono_usuario, correo_usuario, idrol_usuario, estado_usuario } = req.body;
        if (!idusuario || !nombre_usuario || !apellido_usuario || !contraseña_usuario || !telefono_usuario || !correo_usuario || !idrol_usuario || !estado_usuario || undefined || null) {
            res.status(400).send();
        } else {
            const salt = bcryptjs.genSaltSync(8);
            const hash = bcryptjs.hashSync(contraseña_usuario, salt);
            req.getConnection((error, conexion) => {
                if (error) {
                    res.status(400).send(error);
                } else {
                    conexion.query(UserQ.insert, [idusuario, nombre_usuario, apellido_usuario, hash, telefono_usuario, correo_usuario, idrol_usuario, estado_usuario], (error, rows, fields) => {
                        if (!error) {
                            req.getConnection((error, conexion) => {
                                if (error) {
                                    res.status(500).json(error);
                                } else {
                                    conexion.query(UserQ.getUsuarios, (error, rows) => {
                                        if (error) {
                                            res.status(500).json(error);
                                        }
                                        res.status(201).json(rows);
                                    });
                                }
                            });
                            // res.status(201).json({ message: 'Usuario Creado!' });
                        } else {
                            res.status(400).send(error);
                        }
                    });
                }
            });
        }
    }

    eliminar(req, res) {
        let { idusuario } = req.body;
        if (!idusuario || idusuario === undefined || idusuario === null) {
            res.status(400).send();
        } else {
            req.getConnection((error, conexion) => {
                if (error) {
                    res.status(400).send(error);
                } else {
                    conexion.query(UserQ.borrar, [idusuario], (error, rows, fields) => {
                        if (error) {
                            res.status(400).send(error);
                        } else {
                            req.getConnection((error, conexion) => {
                                if (error) {
                                    res.status(500).json(error);
                                } else {
                                    conexion.query(UserQ.getUsuarios, (error, rows) => {
                                        if (error) {
                                            res.status(500).json(error);
                                        }
                                        res.status(200).json(rows);
                                    });
                                }
                            });
                            // res.status(200).json({ message: 'Usuario Eliminado!' });
                        }
                    });
                }
            })
        }
    }

    actualizar(req, res) {
        let { idusuario, telefono_usuario, correo_usuario, idrol_usuario, estado_usuario } = req.body;
        if (idusuario && telefono_usuario && correo_usuario && idrol_usuario && estado_usuario  ) {
            req.getConnection((error, conexion) => {
                if (error) { res.status(500).send(error) }
                else {
                    conexion.query(UserQ.update, [telefono_usuario, correo_usuario, idrol_usuario, estado_usuario, idusuario], (error, rows, fields) => {
                        if (error) { res.status(500).send(error) }
                        else {
                            req.getConnection((error, conexion) => {
                                if (error) {
                                    res.status(500).json(error);
                                } else {
                                    conexion.query(UserQ.getUsuarios, (error, rows) => {
                                        if (error) {
                                            res.status(500).json(error);
                                        }else{
                                            res.status(200).json(rows);
                                        }
                                    });
                                }
                            });
                            // res.status(200).json({message: 'Usuario Actualizado!'});
                        }
                    })
                }
            })
        } else { res.status(400).send() }

    }

    salir(req, res) {
        req.session.destroy((error) => {
            if (error) throw error;
            res.status(200).json({ message: 'Hasta Pronto!' });
        })
    }
    // req.getConnection((error, conexion) => {
    //     if (error) {
    //         res.status(500).json(error);
    //     } else {
    //         conexion.query(UserQ.getUsuarios, (error, rows) => {
    //             if (error) {
    //                 res.status(500).json(error);
    //             }
    //             res.status(200).json(rows);
    //         });
    //     }
    // });

    tipoUsuario(req, res){
        req.getConnection((error, conexion)=>{
            if(error){
                res.status(500).send(error);
            }else{
                conexion.query(UserQ.TipoUser, (error, rows)=>{
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

module.exports = userController;

