
module.exports={
    getInv: `SELECT dbinventarios.inventario.idinventario, inventario.id_producto_inventario, inventario.cant_inventario, producto.nombre_producto  
            FROM dbinventarios.inventario
            INNER JOIN dbinventarios.producto ON inventario.id_producto_inventario = producto.idproducto;`
}