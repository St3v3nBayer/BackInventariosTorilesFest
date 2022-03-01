// Traer todos los Usuarios
const getUsuarios = `SELECT idusuario, nombre_usuario, apellido_usuario, contraseña_usuario, telefono_usuario, correo_usuario, idrol_usuario, descripcion_rol, estado_usuario
                    FROM dbinventarios.usuario
                    INNER JOIN dbinventarios.rol WHERE usuario.idrol_usuario = rol.idrol`;

// Traer de la Db usuario por Id
const getId = 'SELECT idusuario, contraseña_usuario, idrol_usuario, estado_usuario, nombre_usuario FROM usuario WHERE idusuario = ?';

// Crear Usuario en Db
const insert = 'INSERT INTO usuario (idusuario, nombre_usuario, apellido_usuario, contraseña_usuario, telefono_usuario, correo_usuario, idrol_usuario, estado_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

// Borrar usuario de Db
const borrar = 'DELETE FROM usuario WHERE idusuario = ?';

// Actualizar Usuario
const update = 'UPDATE usuario SET telefono_usuario=?, correo_usuario=?, idrol_usuario=?, estado_usuario=? WHERE idusuario = ?';

//Traer Tipo de Usuario
const TipoUser = 'SELECT * FROM rol';

module.exports = { getUsuarios, getId, insert, borrar, update, TipoUser };


/// exportar clases ///// module.exports = UserQuerys;
// para exportar funciones ///module.exports = { getTodos }///
// exportar clases y constantes module.exports = {UserQ, getUsuarios, getId, insert, borrar, update};