module.exports = {
    getProductos: `SELECT dbinventarios.producto.idproducto, nombre_producto, precio_producto, dbinventarios.categoria.descripcion_categoria, categoria.idcategoria, dbinventarios.proveedor.nombre_proveedor, marca_proveedor, proveedor.idproveedor
                    FROM dbinventarios.producto
                    INNER JOIN dbinventarios.categoria ON producto.id_categoria_producto = categoria.idcategoria
                    INNER JOIN dbinventarios.proveedor ON producto.id_proveedor_producto = proveedor.idproveedor;`,
    insertProducto: 'INSERT INTO producto (nombre_producto, precio_producto, id_categoria_producto, id_proveedor_producto) VALUES (?, ?, ?, ?)',
    updateProducto: 'UPDATE producto SET nombre_producto=?, precio_producto=?, id_categoria_producto=?, id_proveedor_producto=? WHERE idproducto = ?',
    borrarProducto: 'DELETE inventario, producto FROM inventario LEFT JOIN producto ON inventario.id_producto_inventario = producto.idproducto WHERE inventario.id_producto_inventario = ?'
}