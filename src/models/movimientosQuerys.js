module.exports = {

    getMovi: `SELECT movimientos.idmovimiento, fecha_movimiento, tipo_movimiento.descripcion as tipo, producto.idproducto, nombre_producto, cant, id_usuario_movimiento
                FROM dbinventarios.movimientos
                INNER JOIN dbinventarios.producto ON movimientos.id_producto_movimiento = idproducto
                INNER JOIN dbinventarios.tipo_movimiento ON movimientos.id_tipo_movimiento = tipo_movimiento.idtipo_movimiento;`,
    inserMovi: `INSERT INTO movimientos (id_tipo_movimiento, id_producto_movimiento, id_usuario_movimiento, cant) VALUES (?, ?, ?, ?)`,
    filterMovi: `SELECT movimientos.idmovimiento, fecha_movimiento, tipo_movimiento.descripcion as tipo, producto.idproducto, nombre_producto, cant, id_usuario_movimiento
    FROM dbinventarios.movimientos
    INNER JOIN dbinventarios.producto ON movimientos.id_producto_movimiento = idproducto
    INNER JOIN dbinventarios.tipo_movimiento ON movimientos.id_tipo_movimiento = tipo_movimiento.idtipo_movimiento
    WHERE fecha_movimiento BETWEEN ? AND ?`
}